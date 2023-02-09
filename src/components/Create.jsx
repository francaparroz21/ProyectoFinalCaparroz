import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Navbar } from "./Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig/firebase";

export const Create = () => {
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(0)
    const [img, setImg] = useState(null)

    //Collection reference
    const productsCollection = collection(db, "bossyProducts")

    //Navigate
    const navigate = useNavigate()

    //POST
    const postProduct = async (e) => {
        e.preventDefault()
        const urlImg = await uploadImage(img)
        
        await addDoc(productsCollection, {
            name: name,
            description: description,
            stock: stock,
            price: price,
            urlImg: urlImg
        })
        navigate("/products")
    }

    //Upluad Image
    const uploadImage = async (image) => {
        //referencia de storage
        const storageRef = ref(storage, "productsImages/"+image.name)

        //funcion que sube la imagen al storage
        await uploadBytes(storageRef, image)

        //retornamos url, que va a ir en el atributo 'urlImg'
        console.log(await getDownloadURL(storageRef))
        return await getDownloadURL(storageRef)
    }

    return (
        <>
            <Navbar />
            <Form className="form-create-product" onSubmit={postProduct}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name Product</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Example: Idraet Serum" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Short product description of product details." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="Example: '2000'." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control onChange={(e) => setStock(e.target.value)} value={stock} type="number" placeholder="Example: '4'." />
                </Form.Group>

                <Form.Label>Upload Image</Form.Label>
                <Form.Control onChange={(e) => setImg(e.target.files[0])} type="file" />

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}