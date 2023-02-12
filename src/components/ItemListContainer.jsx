import { Navbar } from "./Navbar"
import { getDocs, collection,where,query } from "firebase/firestore"
import { db} from "../firebaseConfig/firebase"
import { Footer } from "./Footer"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { ItemList } from "./ItemList"

export const ItemListContainer = () => {

    //Params category id
    const { id } = useParams()
    //Hook useState
    const [products, setProducts] = useState([])


    useEffect(() => {
        const productsCollection = collection(db, "bossyProducts")
        if (id) {
            const filter = query(productsCollection, where("category", "==", id))
            getDocs(filter).then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
        } else {
            getDocs(productsCollection).then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
        }
    }, [id])


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