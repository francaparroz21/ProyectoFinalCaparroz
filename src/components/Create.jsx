import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Navbar } from "./Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            <Navbar />
            <Form onSubmit={postProduct}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name Product</Form.Label>
                    <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Example: Idraet Serum" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  onChange={(e)=>setDescription(e.target.value)} value={description} type="text" placeholder="Short product description of product details." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e)=>setPrice(e.target.value)} value={price} type="number" placeholder="Example: '2000'." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control onChange={(e)=>setStock(e.target.value)} value={stock} type="number" placeholder="Example: '4'." />
                </Form.Group>

                <Form.Label>Upload Image</Form.Label>
                <Form.Control  type="file" />

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