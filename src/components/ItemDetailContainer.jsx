import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ItemCount } from "./ItemCount";
import { Footer } from "./Footer";

export const ItemDetailContainer = () => {

    //Hook useState item
    const [data, setData] = useState({});
    // useParams /item/:id
    const { id } = useParams()

    useEffect(() => {
        const docRef = doc(db, "bossyProducts", id)
        getDoc(docRef)
            .then(res => setData({ id: res.id, ...res.data() }))
    }, [id])

    const productNullQuery = () => {
        if (data.name) {
            return (
                <div className="item-detail-container container">
                    <h3 className="title-detail-container">{data.name}</h3>

                    <div className="display-detail-container">
                        <img className="img-detail-container" src={data.urlImg} alt={data.name} />
                        <div className="display-right-detail-container">
                            <p>{data.description}</p>
                            <span>Stock disponible: {data.stock}</span>
                            <div className='add-tocart'>
                                <ItemCount data={data} stockProduct={data.stock} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <h2>404. Product Not Found.</h2>
        }
    }


    return (
        <>
            {productNullQuery()}
            <Footer />
        </>
    )
}