import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Navbar } from "./Navbar";
import { FormCreateProduct } from "./FormCreateProduct";

export const Create = () => {
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(0)

    //Collection reference
    const productsCollection = collection(db, "bossyProducts")

    //Navigate
    const navigate = useNavigate()

    const postProduct = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {
            name: name,
            description: description,
            stock: stock,
            price: price
        })
        navigate("/products")
    }

    return (
        <>
        <Navbar/>
        <FormCreateProduct/>
        </>
    )
}