import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./itemdetailcontainer.css"
import { ItemDetail } from "../itemdetail/ItemDetail";

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
        <ItemDetail data={data}/>
    )
}