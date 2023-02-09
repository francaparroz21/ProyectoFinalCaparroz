import { Link } from "react-router-dom";
import CartWidget from "./CartWidget"

export const Navbar = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md">
                <div className="navbar-left">
                    <div>
                        <Link className="nav-link" to={"/"}><img src={process.env.PUBLIC_URL + "/images/Bossy2.png"} alt="" /></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="options">
                        <ul className="navbar-nav">
                            <Link className="nav-item" to={"/"}>Inicio</Link>
                            <Link className="nav-item" to={"/products"}>Productos</Link>
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#options">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-right">
                    <div>
                        <CartWidget id='cartIconToggle' type="button" toggle="offcanvas" target="#offcanvasWithBackdrop"
                            ariacontrols="offcanvasWithBackdrop" routeImg="trolley-cart.png" />
                    </div>
                </div>
            </nav>
        </header>
    );
}