import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Create context
export const CartContext = React.createContext([])

//Use context
export const useCartContext = () => useContext(CartContext);


//Provider
export const CartProvider = ({ children }) => {

    //Estado de los productos
    const [cart, setCart] = useState([])

    //Estado de la longitud del carrito
    const [cartCount, setCartCount] = useState(0)



    //Toast product added
    const toastProductAdded = () => {
        toast.success("Product added !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const toastProductRepeated = () => {
        toast.error("Product already added !", {
            position: toast.POSITION.TOP_RIGHT
        });
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
        localStorage.setItem("cart",JSON.stringify(cart))
    }

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

    //Function para agregar un producto.
    const addProduct = (product, quantity) => {
        if (!productRepeated(product.id)) {
            cart.push({ ...product, quantity: quantity })
            setCartCount(cartCount + 1)
            localStorage.setItem("cart",JSON.stringify(cart))
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
            cart
        }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    )
}