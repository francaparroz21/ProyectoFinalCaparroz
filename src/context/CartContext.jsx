import { useState,createContext } from "react";

//Context
export const CartContext = createContext()

//Provider
export const CartProvider = ({ children }) => {
    //Estado de los productos
    const [cart, setCart] = useState([])

    function getQuantity() {
        const newList = [...cart]
        return newList.lenght
    }

    //Function booleana para saber si el producto esta repetido por su id
    const productRepeated = (id) => cart.find(element => element.id === id) ? true : false

    //Function para agregar un producto, falta mejorar el else.
    const addProduct = (product) => {
        if (!productRepeated(product.id)) {
            const newProduct = { ...product, totalPrice: product.stock * product.price }
            const newList = { ...cart }
            newList.push(newProduct)
            setCart(newList)
        } else {
            console.log("product already added")
        }
    }

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => {
        const copy = [...cart]
        const newList = copy.filter(element => element.id !== id)
        setCart(newList)
    }

    //Function para limpiar el carrito
    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, getQuantity, addProduct, deleteProduct, clearCart, productRepeated }}>
            {children}
        </CartContext.Provider>
    )
}