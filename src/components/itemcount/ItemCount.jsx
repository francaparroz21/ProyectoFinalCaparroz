import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useCartContext } from '../../context/CartContext';
import "./itemcount.css"

export const ItemCount = (props) => {

    const [count, setCount] = useState(1);
    const { addProduct } = useCartContext()

    const increase = () => {
        setCount(count + 1)
    }

    const decrease = () => {
        setCount(count - 1)
    }
    

    return (
        <div className='toaddcart'>
            <div className="item-count">
                <Button disabled={count <= 1} variant="outline-primary" onClick={() => decrease()}>-</Button>
                <span>{count}</span>
                <Button disabled={count >= props.stockProduct} variant="outline-primary" title="+" onClick={() => increase()}>+</Button>
            </div>
            <Button onClick={() => addProduct(props.data,count)} variant="success" title="Add to Cart" >Add to cart</Button>
        </div>
    )
}