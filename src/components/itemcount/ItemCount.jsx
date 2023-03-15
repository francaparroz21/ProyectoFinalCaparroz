import Button from 'react-bootstrap/Button';
import "./itemcount.css"
import { useState } from 'react';

export const ItemCount = (props) => {

    const [count, setCount] = useState(props.count);

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
            <Button onClick={() => props.onAdd(count)} variant="success" title="Add to Cart" >Add to cart</Button>
        </div>
    )
}