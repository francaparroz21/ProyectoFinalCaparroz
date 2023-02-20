import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export const ItemCount = ({ stockProduct }) => {
    const [count, setCount] = useState(1);

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
                <Button disabled={count >= stockProduct} variant="outline-primary" title="+" onClick={() => increase()}>+</Button>
            </div>
        </div>
    )
}