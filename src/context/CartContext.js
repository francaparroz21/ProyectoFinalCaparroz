import { createContext, useState } from "react";

//Context
export const CartContext = createContext()

//Provider
export const CartProvider = ({ children }) => {
    //Estado de los productos
    const [products, setProducts] = useState([])

    //Function para saber si el producto esta repetido por su id
    const productRepeated = (id) => {
        const found = products.find(element => element.id == id);
        return found
    }

    //Function para agregar un producto, falta mejorar el else.
    const addProduct = (product) => {
        if (!productRepeated(product.id)) {
            const newProduct = { ...product, totalPrice: stock * product.price }
            const newList = { ...products }
            newList.push(newProduct)
            setProducts(newList)
        } else {
            console.log("product already added")
        }
    }

    //Function para eliminar un producto por su id
    const deleteProduct = (id) => {
        setProducts(products.filter(element => element.id !== id))
    }

    //Function para limpiar el carrito
    const clearCart = ()=>{
        setProducts([])
    }

    return (
        <CartContext.Provider value={{products,addProduct,deleteProduct,clearCart,productRepeated}}>
            {children}
        </CartContext.Provider>
    )
}