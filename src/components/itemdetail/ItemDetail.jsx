import { ItemCount } from "../itemcount/ItemCount";
import { useCartContext } from "../../context/cartContext/CartContext";
import "./itemdetail.css"

export const ItemDetail = ({ data }) => {

    //Add product del cart context
    const { addProduct } = useCartContext()

    //para que pase un valor (callback) el item count.
    const onAdd = (quantity) => {
        addProduct(data, quantity)
    }
    return (
        <>
            <div className="item-detail-container container-fluid">
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