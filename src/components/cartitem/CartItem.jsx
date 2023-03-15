import { useState } from "react"
import { Button } from "react-bootstrap"
import { useCartContext } from "../../context/cartContext/CartContext"
import "./cartitem.css"

export const CartItem = ({ product }) => {
    const [count, setCount] = useState(product.quantity)

    const { deleteProduct, totalProductPrice } = useCartContext()

    const [totalPrice, setTotalPrice] = useState(totalProductPrice(product))

    const onClickDecrease = () => {
        setCount(count - 1)
        setTotalPrice(totalPrice - (product.price))
    }

    const onClickIncrease = () => {
        setCount(count + 1)
        setTotalPrice(totalPrice + (product.price))
    }

    return (
        <>
            <img className="imgInCart" src={product.urlImg} alt="" />
            <div>
                <h4 className="productTitle">{product.name}</h4>
                <p>{product.description}</p>
                <div className="quantity-price-display">
                    <span>Quantity: {product.quantity}</span>
                    <span>Price: {totalPrice}</span>
                </div>
                <div className="displayCountInCart">
                    <div className="item-count">
                        <Button disabled={count <= 1} variant="outline-primary" onClick={() => onClickDecrease()}>-</Button>
                        <span>{count}</span>
                        <Button disabled={count >= product.stock} variant="outline-primary" title="+" onClick={() => onClickIncrease()}>+</Button>
                    </div>
                    <Button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete Product</Button>
                </div>
            </div>
        </>
    )
}