import { useCartContext } from "../../context/cartContext/CartContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./checkout.css"
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";

export const Checkout = () => {

    const { cart, totalBuy } = useCartContext()

    const [form, setForm] = useState()

    const order = {
        buyer: form,
        items: cart.map (product => ({id: product.id, name: product.name, price: product.price, quantity: product.quantity})),
        total: totalBuy
    }

    const submitOrder = () =>{
        const db = getFirestore()
        const ordersCollection = collection(db,"bossyOrders")
        addDoc(ordersCollection,order)
    }


    return (
        <>
            <h2 className="detailBuy-title">Detalle de la compra</h2>

            <div className="buyCheckout">
                <div className="productsInList">
                    <h3 className="ticketTitle">Ticket</h3>
                    <ul>
                        {cart.map((product) => {
                            return (
                                <li key={product.id}>{"x" + product.quantity + " - " + product.name}</li>
                            )
                        })}
                    </ul>
                    <span className="totalPriceInCheckout">Total Price: ${totalBuy}</span>
                </div>

                <div className="formOrderedBuy">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setForm({...form, name: e.target.value})} type="text" placeholder="Enter your name." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setForm({...form, email: e.target.value})} type="email" placeholder="Enter email." />
                        </Form.Group>

                        <Button onClick={()=> submitOrder()} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}