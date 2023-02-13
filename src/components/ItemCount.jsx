import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export const ItemCount = ({stockProduct}) => {
    const [count, setCount] = useState(1);

    return (
        <div className='toaddcart'>
            <div className="item-count">
                <Button variant="outline-primary" onClick={() => {if(count > 1){
                    setCount(count - 1)
                }}}>-</Button>
                <span>{count}</span>
                <Button variant="outline-primary" title="+" onClick={() => {if(count<stockProduct){
                    setCount(count + 1)
                }}}>+</Button>
            </div>
        </div>
    )
}