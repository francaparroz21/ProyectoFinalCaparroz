import { Navbar } from "./Navbar"
import { getDocs,collection } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { Footer } from "./Footer"
import { Item } from "./Item"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"

export const ItemListContainer = () => {
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
                    return (<Item key={product.id} product={product} />);
                })}
            </div>
            <Footer />
        </>
    )
}