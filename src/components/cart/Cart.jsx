import { useCartContext } from "../../context/cartContext/CartContext"
import "./cart.css"
import { CartItem } from "../cartitem/CartItem"
import { Button } from "react-bootstrap"
import { useState } from "react"

export const Cart = () => {

    const { cart, totalPriceProducts, clearCart } = useCartContext()

    const [totalBuy, setTotalBuy] = useState(totalPriceProducts())

    return (
        <div className="cart container">
            {cart.map((product) => {
                return (
                    <div key={product.id} className="item-cart">
                        <CartItem product={product} />
                        <div className="totalBuy">
                        </div>
                    </div>
                );
            })}
            <div className="finalBuy">
                <span>Total Buy: {totalBuy}</span>
                <Button onClick={() => clearCart()} className="btn btn-danger">Delete all products.</Button>
                <Button className="btn btn-success">Buy products.</Button>
            </div>
        </div>
    )
}