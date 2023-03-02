import { useCartContext } from "../../context/CartContext"
import "./cart.css"

export const Cart = () => {

    const { cart } = useCartContext()

    return (
        <div className="cart container">
            {cart.map((product) => {
                return (
                    <div className="item-cart">
                        <img src={product.urlImg} alt="" />
                        <div>
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <span>Quantity: {product.quantity}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}