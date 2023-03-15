import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cartcontext.css"
import { db } from "../../firebaseConfig/firebase";
import { getDocs, collection } from "firebase/firestore";

//Create context
export const CartContext = React.createContext([])

//Use context
export const useCartContext = () => useContext(CartContext);


//Provider
export const CartProvider = ({ children }) => {

    //Funcion para obtener carrito del storage
    const getCartToStorage = () => {
        if (localStorage.getItem("cart")) return JSON.parse(localStorage.getItem("cart"))
        return []
    }

    //Estado de los productos
    const [cart, setCart] = useState(getCartToStorage())

    //Estado de los productos en firebase
    const [products, setProducts] = useState()

    //Funcion para obtener carrito del storage
    const getCartCount = () => {
        return cart.lenght
    }

    //Estado de la longitud del carrito
    const [cartCount, setCartCount] = useState([getCartCount()])

    //Estado para la carga de la pagina.
    const [loading, setLoading] = useState(false)

    //funcion que devuelve el total de la compra en el carrito.
    const totalPriceProducts = () => cart.reduce((acc, product) => acc + product.quantity * product.price, 0)

    //Funcion que nos dice el total de cantidad de productos.
    const totalCountProducts = () => cart.reduce((acc) => acc + 1, 0)

    //Toast product added
    const toastProductAdded = () => {
        toast.success("Product added !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    //Toast product repeated
    const toastProductRepeated = () => {
        toast.error("Product already added !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    //Funcion que retorna todos los productos en firebase.
    const getProducts = () => {
        const productsCollection = collection(db, "bossyProducts")
        getDocs(productsCollection).then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
    }

    //Funcion asincronica que carga la pagina
    const functionLoading = () => {
        setTimeout(() => {
            setLoading(true)
        }, 3000)
    }

    //Function para limpiar el carrito
    const clearCart = () => {
        setCart([])
        setCartCount(0)
        localStorage.setItem("cart",JSON.stringify(cart))
    }

    //Function para calcular el precio total por un tipo de producto (quantity * price)
    const totalProductPrice = (product) => product.price * product.quantity

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => {
        let cartFiltered = cart.filter(product => product.id !== id) 
        setCart(cartFiltered)
        saveCartToStorage(cartFiltered)
        setCartCount(cartCount - 1)
    }

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

    //Function que printea en el offcanvas
    const printInOffcanvas = (product, quantity) => {
        const div = document.createElement("div")
        div.innerHTML = `<h4 class='nameInOffCanvas'>${product.name}</h4>
            <div class='display-offcanvas-product'>
            <img class="imgInOffcanvas" src=${product.urlImg} alt="" />
            <div class='itemcount-offcanvas'>
            <span>Price: ${product.price}</span><button class='btn btn-danger'>-</button>${quantity}<button class='btn btn-success'>+</button>
            </div>
             </div>
            <p>${product.description}</p>`
        //Agregamos el producto a la ventana del cart
        document.getElementById("cartProductsContainer").append(div)
    }

    //Funcion para guardar carrito
    const saveCartToStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    //Function para agregar un producto.
    const addProduct = (product, quantity) => {
        if (!productRepeated(product.id)) {
            cart.push({ ...product, quantity: quantity })
            localStorage.setItem("cart", JSON.stringify(cart))
            setCartCount(cartCount + 1)
            toastProductAdded()

            printInOffcanvas(product, quantity)
        } else {
            toastProductRepeated()
        }
    }


    return (
        <CartContext.Provider value={{
            clearCart,
            deleteProduct,
            productRepeated,
            addProduct,
            cartCount,
            cart,
            loading,
            functionLoading,
            products,
            setProducts,
            getProducts,
            totalPriceProducts,
            totalCountProducts,
            totalProductPrice
        }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    )
}