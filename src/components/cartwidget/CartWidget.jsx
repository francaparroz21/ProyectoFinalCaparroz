import { useCartContext } from "../../context/cartContext/CartContext";
import { Link } from "react-router-dom";


//Componente CartWidget, retorna un contenedor con el logo del carrito y el contador.
const CartWidget = (props) => {

    const { totalCountProducts } = useCartContext()
    
    return (
        <div className="cart-widget">
            <Link to={"/cart"}><img src={process.env.PUBLIC_URL + "/images/" + props.routeImg} alt={props.alt} /><div className="countCart"><span>{totalCountProducts()}</span></div></Link>
        </div>
    )
}

export default CartWidget;