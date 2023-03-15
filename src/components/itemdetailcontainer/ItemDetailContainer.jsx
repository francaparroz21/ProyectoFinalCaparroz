import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ItemCount } from "../itemcount/ItemCount";
import "./itemdetailcontainer.css"
import { useCartContext } from "../../context/cartContext/CartContext";

export const ItemDetailContainer = () => {

    //Hook useState item
    const [data, setData] = useState({});
    // useParams /item/:id
    const { id } = useParams()

    //Add product del cart context
    const { addProduct } = useCartContext()


    //para que pase un valor (callback) el item count.
    const onAdd = (quantity) =>{
        addProduct(data,quantity)
    }

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
                            <ItemCount count={1} onAdd={onAdd} data={data} stockProduct={data.stock} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}