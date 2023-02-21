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

    //Function para obtener la cantidad de items a comprar para el CartWidget
    const getProductsCount = () => {
        return <span>{cart.length}</span>
    }

    //Function para limpiar el carrito
    const clearCart = () => setCart([])

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => setCart(cart.filter(element => element.id !== id))

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

    //Function para agregar un producto.
    const addProduct = (product, quantity) => {
        if (!productRepeated(product.id)) {
            cart.push({ ...product, quantity: quantity })
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
            getProductsCount
        }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    )
}