import { useCartContext } from "../../context/cartContext/CartContext"
import "./cart.css"
import { CartItem } from "../cartitem/CartItem"

export const Cart = () => {

    const { cart } = useCartContext()

    return (
        <div className="cart container">
            {cart.map((product) => {
                return (
                    <div key={product.id} className="item-cart">
                        <CartItem product={product}/>
                    </div>
                );
            })}
        </div>
    )
}