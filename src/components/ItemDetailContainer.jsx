import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Navbar } from "./Navbar";
import { ItemCount } from "./ItemCount";
import { Button } from "react-bootstrap";
import { Footer } from "./Footer";



export const ItemDetailContainer = () => {

    //Hook useState item
    const [data, setData] = useState({});
    // useParams /item/:id
    const { id } = useParams()

    useEffect(() => {
        const queryDb = getFirestore()
        const docRef = doc(queryDb, "bossyProducts", id)
        getDoc(docRef)
            .then(res => setData({ id: res.id, ...res.data() }))
    }, [id])


    return (
        <>
            <Navbar />
            <div className="item-detail-container container">
                <h3 className="title-detail-container">{data.name}</h3>

                <div className="display-detail-container">
                    <img className="img-detail-container" src={data.urlImg} alt={data.name} />
                    <div className="display-right-detail-container">
                        <p>{data.description}</p>
                        <span>Stock disponible: {data.stock}</span>
                        <div className='add-tocart'>
                            <ItemCount stockProduct={data.stock} />
                            <Button variant="success" title="Add to Cart" >Add to cart</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}