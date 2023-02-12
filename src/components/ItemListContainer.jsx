import { Navbar } from "./Navbar"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { Footer } from "./Footer"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { ItemList } from "./ItemList"

export const ItemListContainer = () => {

    const { category } = useParams()
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
    }, [category])

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
            <div>
                <ItemList products={products}></ItemList>
            </div>
            <Footer />
        </>
    )
}