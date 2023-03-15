import { useState } from "react"
import { Button } from "react-bootstrap"
import "./cartitem.css"

export const CartItem = ({ product }) => {
    const [count, setCount] = useState(product.quantity)

    const {deleteProduct} = useCartContext()

    return (
        <>
            <img className="imgInCart" src={product.urlImg} alt="" />
            <div>
                <h4 className="productTitle">{product.name}</h4>
                <p>{product.description}</p>
                <span>Quantity: {product.quantity}</span>
                <div className="displayCountInCart">
                    <div className="item-count">
                        <Button disabled={count <= 1} variant="outline-primary" onClick={() => setCount(count - 1)}>-</Button>
                        <span>{count}</span>
                        <Button disabled={count >= product.stock} variant="outline-primary" title="+" onClick={() => setCount(count + 1)}>+</Button>
                    </div>
                    <Button className="btn btn-danger">Delete Product</Button>
                </div>
            </div>
        </>
    )
}