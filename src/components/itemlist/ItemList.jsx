import { Item } from "../item/Item";

export const ItemList = ({ products }) => {

    return (
        <div className="cardsContainer">
            {products.map((product) => {
                return (<Item key={product.id} product={product} />);
            })}
        </div>
    )
}