import { Navbar } from "./Navbar";
import { db } from "../firebaseConfig/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ItemProduct } from "./Item";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Products = () => {
    //Hook useState
    const [products, setProducts] = useState([])

    //Collection reference
    const productsCollection = collection(db, "bossyProducts")

    //GET products function
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProducts(data.docs.map((product) => ({ ...product.data(), id: product.id })))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Navbar />
            <div className="create-product">
                <Link to={"/create"}>
                    <Button>
                        Create a product.
                    </Button>
                </Link>
            </div>
            <div className="cardsContainer">
                {products.map((product) => {
                    return (<ItemProduct key={product.id} product={product} />);
                })}
            </div>
        </>
    );
}