import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ItemCount } from "../itemcount/ItemCount";

import { Link } from "react-router-dom";
import "./itemdetailcontainer.css"

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



    return (
        <>
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
            <Link to="../../cart">aca</Link>
        </>
    )
}