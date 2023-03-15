import { getDocs, collection, where, query } from "firebase/firestore"
import { db } from "../../firebaseConfig/firebase"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import "./itemlistcontainer.css"

import { ItemList } from "../itemlist/ItemList"
import { useCartContext } from "../../context/cartContext/CartContext"

export const ItemListContainer = () => {

    //Params category id
    const { id } = useParams()

    const { products, getProducts, setProducts, loading, functionLoading } = useCartContext();


    useEffect(() => {
        const productsCollection = collection(db, "bossyProducts")
        if (id) {
            const filter = query(productsCollection, where("category", "==", id))
            getDocs(filter).then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
        } else { getProducts() }
        functionLoading()
    }, [id, functionLoading, setProducts, getProducts])


    return (
        <>
            <div>
                {loading ?
                    <ItemList products={products} />
                    : <span>Loading...</span>
                }
            </div>
        </>
    )
}