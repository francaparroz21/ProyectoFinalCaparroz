import { Link, NavLink } from "react-router-dom";
import CartWidget from "../cartwidget/CartWidget"
import "./navbar.css"

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
                            <NavLink className="nav-item" to={"/category/Cosmetic"}>Cosmetics</NavLink>
                            <NavLink className="nav-item" to={"/category/Makeup"}>Makeup</NavLink>
                            <NavLink className="nav-item" to={"/Aboutme"}>About Me</NavLink>
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#options">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-right">
                    <div>
                        <CartWidget type="button" routeImg="trolley-cart.png" />
                    </div>
                </div>
            </nav>
        </header>
    );
}