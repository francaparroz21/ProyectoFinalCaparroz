import { useCartContext } from "../../context/CartContext";


//Componente CartWidget, retorna un contenedor con el logo del carrito y el contador.
const CartWidget = (props) => {

    const { cartCount } = useCartContext()
    
    return (
        <div className="cart-widget">
            <a aria-controls={props.ariacontrols} data-bs-target={props.target} data-bs-toggle={props.toggle} type={props.type} id={props.id} href={props.route}><img src={process.env.PUBLIC_URL + "/images/" + props.routeImg} alt={props.alt} /><div className="countCart"><span>{cartCount}</span></div></a>
        </div>
    )
}

export default CartWidget;