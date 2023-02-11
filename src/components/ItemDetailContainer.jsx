import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Item } from "./Item";

export const ItemDetailContainer = () => {

    // useParams /item/:id
    const { productId } = useParams();

    //Hook useState item
    const [item, setItem] = useState({});

    //Collection reference
    const productsCollection = db.collection("bossyProducts").get()

    
    const getItem = async (id) => {
        const data = await getDocs(productsCollection)
        data.docs.map((product) => { console.log(product) })
    }
    

    useEffect(() => {
        getItem(productId)
    }, [productId])


    return (
        <div className="item-detail-container">
            {
                productsCollection.forEach((doc) => {
                    console.log(doc);
                  })
            }
        </div>
    )
}