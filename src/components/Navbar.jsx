import CartWidget from "./CartWidget"

export const Navbar = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md">
                <div className="navbar-left">
                    <div>
                        <a className="nav-link" href="./"><img src={process.env.PUBLIC_URL + "/images/Bossy2.png"} alt="" /></a>
                    </div>
                    <div className="collapse navbar-collapse" id="options">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link" href="./">Inicio</a></li>
                            <li className="nav-item"><a className="nav-link" href="./products">Productos</a></li>
                            <li className="nav-item"><a className="nav-link" href="./">Servicios</a></li>
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