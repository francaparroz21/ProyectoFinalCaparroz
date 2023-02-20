import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { doc, getDoc} from "firebase/firestore";
import { Navbar } from "./Navbar";
import { ItemCount } from "./ItemCount";
import { Button } from "react-bootstrap";
import { Footer } from "./Footer";
import { useCartContext } from "../context/CartContext";




export const ItemDetailContainer = () => {

    const {addProduct} = useCartContext()

    //Hook useState item
    const [data, setData] = useState({});
    // useParams /item/:id
    const { id } = useParams()

    useEffect(() => {
        const docRef = doc(db, "bossyProducts", id)
        getDoc(docRef)
            .then(res => setData({ id: res.id, ...res.data() }))
    }, [id])

    const productNullQuery = ()=>{
        if(data.name){
            return (
                <div className="item-detail-container container">
                <h3 className="title-detail-container">{data.name}</h3>

                <div className="display-detail-container">
                    <img className="img-detail-container" src={data.urlImg} alt={data.name} />
                    <div className="display-right-detail-container">
                        <p>{data.description}</p>
                        <span>Stock disponible: {data.stock}</span>
                        <div className='add-tocart'>
                            <ItemCount stockProduct={data.stock} />
                            <Button onClick={addProduct(data)} variant="success" title="Add to Cart" >Add to cart</Button>
                        </div>
                    </div>
                </div>
            </div>
            )
        }else{
            return <h2>404. Product Not Found.</h2>
        }
    }


    return (
        <>
            <Navbar />
            {productNullQuery()}
            <Footer/>
        </>
    )
}