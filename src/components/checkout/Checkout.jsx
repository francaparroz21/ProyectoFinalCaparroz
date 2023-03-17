import { useCartContext } from "../../context/cartContext/CartContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./checkout.css"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {

    const navigate = useNavigate()

    const { cart, totalBuy, finishBuy, setCart, setCartCount, setTotalBuy } = useCartContext()

    const [form, setForm] = useState([])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const order = {
        buyer: {
            name: form.name,
            email: form.email
        },
        items: cart.map(product => ({ id: product.id, name: product.name, price: product.price, quantity: product.quantity })),
        total: totalBuy,
    }

    const submitOrder = () => {
        //Collection reference
        const ordersCollection = collection(db, "bossyOrders")
        addDoc(ordersCollection, order)
            .then(({ id }) => console.log(id))
        finishBuy()
        const cartEmpty = []
        localStorage.setItem("cart", JSON.stringify(cartEmpty))
        setCart(cartEmpty)
        setCartCount(0)
        setTotalBuy(0)

        setTimeout(() => {
            navigate("/")
        }, 3000)
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
                            <Form.Control name="name" onChange={(e) => handleChange(e)} type="text" placeholder="Enter your name." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" onChange={(e) => handleChange(e)} type="email" placeholder="Enter email." />
                        </Form.Group>

                        <Button onClick={() => submitOrder()} variant="primary">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}