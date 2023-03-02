import { getDocs, collection, where, query } from "firebase/firestore"
import { db } from "../../firebaseConfig/firebase"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./itemlistcontainer.css"

import { ItemList } from "../itemlist/ItemList"

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
            <div>
                <ItemList products={products} />
            </div>
        </>
    )
}