import React, { useState, useContext, useEffect } from "react";

//Create context
export const CartContext = React.createContext([])

//Use context
export const useCartContext = () => useContext(CartContext);


//Provider
export const CartProvider = ({ children }) => {

    //Estado de los productos
    const [cart, setCart] = useState([])



    //Function para limpiar el carrito
    const clearCart = () => setCart([])

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => setCart(cart.filter(element => element.id !== id))

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

    //Function para agregar un producto, falta mejorar el else.
    const addProduct = (product, quantity) => {
        const newCart = cart.filter(element => element.id !== product.id)
        newCart.push({ ...product, quantity: quantity })
        setCart(newCart)
        console.log(cart)
    }


    return (
        <CartContext.Provider value={{
            clearCart,
            deleteProduct,
            productRepeated,
            addProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}