import { useCartContext } from "../../context/cartContext/CartContext"
import "./cart.css"
import { CartItem } from "../cartitem/CartItem"
import { Button } from "react-bootstrap"

export const Cart = () => {

    const { cart, clearCart, totalBuy } = useCartContext()

    const isEmpty = (cart) => {
        if (cart.length === 0) return true
        return false
    }
    console.log(cart)

    return (<>
        {isEmpty(cart) ?
            <>
                <h4 className="cartEmpty">The cart is empty.</h4>
                <div className="imgCartEmpty">
                    <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-cart-web-flaticons-lineal-color-flat-icons-3.png" alt="cart empty" />
                </div>
            </>
            :
            <div className="cart container">
                <h2 className="cartTittle">PRODUCTS IN CART</h2>
                {cart.map((product) => {
                    return (
                        <div key={product.id} className="item-cart">
                            <CartItem product={product} />
                            <div className="totalBuy">
                            </div>
                        </div>
                    );
                })}
                <span className="totalBuy">Total Buy: {totalBuy}</span>
                <div className="buttonsBuy">
                    <Button onClick={() => clearCart()} className="btn btn-danger">Delete all products.</Button>
                    <Button className="btn btn-success">Buy products.</Button>
                </div>
            </div>

        }
    </>

    )
}