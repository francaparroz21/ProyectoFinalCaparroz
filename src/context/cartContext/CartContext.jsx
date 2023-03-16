import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cartcontext.css"
import { db } from "../../firebaseConfig/firebase";
import { getDocs, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//Create context
export const CartContext = React.createContext([])

//Use context
export const useCartContext = () => useContext(CartContext);



//Provider
export const CartProvider = ({ children }) => {

    //Use Navigate
    const navigate = useNavigate()

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

    //Estado del total de la compra
    const [totalBuy, setTotalBuy] = useState(totalPriceProducts())

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You are going to clear all products!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete.'
        }).then((result) => {
            if (result.isConfirmed) {
                const cartEmpty = []
                localStorage.setItem("cart", JSON.stringify(cartEmpty))
                setCart(cartEmpty)
                setCartCount(0)
                setTotalBuy(0)
                Swal.fire(
                    'The products are deleted.',
                    'Your cart is cleared.',
                    'success'
                )
            }
        })
    }

    //Function para calcular el precio total por un tipo de producto (quantity * price)
    const totalProductPrice = (product) => product.price * product.quantity

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => {
        let cartFiltered = cart.filter(product => product.id !== id)
        let productFounded = cart.find(product => product.id === id)
        setCart(cartFiltered)
        saveCartToStorage(cartFiltered)
        setCartCount(cartCount - 1)
        setTotalBuy(totalBuy - (productFounded.quantity * productFounded.price))
    }

    //Function para comprar todos los productos y llevar a componente checkout.
    const buyProducts = () => {
        Swal.fire({
            title: 'You want to finish the purchase order?',
            showDenyButton: true,
            confirmButtonText: 'Yes.',
            denyButtonText: `No.`,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/checkout")
            }
        })
    }

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

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
            setTotalBuy(totalBuy + product.price)
            toastProductAdded()

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
            setCart,
            loading,
            functionLoading,
            products,
            setProducts,
            getProducts,
            totalPriceProducts,
            totalCountProducts,
            totalProductPrice,
            totalBuy, setTotalBuy,
            buyProducts,
            navigate,
            saveCartToStorage,
        }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    )
}