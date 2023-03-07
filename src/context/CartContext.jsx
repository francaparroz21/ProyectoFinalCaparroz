import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cartcontext.css"
import { db } from "../firebaseConfig/firebase";
import { getDocs,collection } from "firebase/firestore";

//Create context
export const CartContext = React.createContext([])

//Use context
export const useCartContext = () => useContext(CartContext);


//Provider
export const CartProvider = ({ children }) => {

    //Estado de los productos
    const [cart, setCart] = useState([])

    //Estado de los productos en firebase
    const [products, setProducts] = useState()

    //Estado de la longitud del carrito
    const [cartCount, setCartCount] = useState(0)

    //Estado para la carga de la pagina.
    const [loading, setLoading] = useState(false)

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
    const getProducts = ()=>{
        const productsCollection = collection(db, "bossyProducts")
        getDocs(productsCollection).then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
    }

    //Funcion asincronica que carga la pagina
    const functionLoading = () => {
        setTimeout(() => {
            setLoading(true)
        },3000)
    }

    //Function para limpiar el carrito
    const clearCart = () => {
        setCart([])
        setCartCount(0)
        localStorage.clear()
    }

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => {
        setCart(cart.filter(element => element.id !== id))
        setCartCount(cartCount - 1)
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

    //Function que printea en el offcanvas
    const printInOffcanvas = (product) =>{
        const div = document.createElement("div")
            div.innerHTML = `<h4 class='nameInOffCanvas'>${product.name}</h4>
            <div class='display-offcanvas-product'>
            <img class="imgInOffcanvas" src=${product.urlImg} alt="" />
            <div class='itemcount-offcanvas'>
            <span>Price: ${product.name}</span><button class='btn btn-danger'>-</button>${quantity}<button class='btn btn-success'>+</button>
            </div>
             </div>
            <p>${product.description}</p>`
            //Agregamos el producto a la ventana del cart
            document.getElementById("cartProductsContainer").append(div)
    }

    //Function para agregar un producto.
    const addProduct = (product, quantity) => {
        if (!productRepeated(product.id)) {
            cart.push({ ...product, quantity: quantity })
            setCartCount(cartCount + 1)
            toastProductAdded()

            printInOffcanvas(product)
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
            getProducts
        }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    )
}