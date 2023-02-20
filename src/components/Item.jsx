import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const Item = ({ product }) => {
    const [cart,setCart] = useContext(CartContext)

    const {productRepeated} = useContext(CartContext)

    const addToCart = ()=>{
        setCart((items)=>{
            if(productRepeated)return items.map((item)=>{
                if(item.id === id)return {...item}
            })
        })
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.urlImg} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <div className='see-more'>
                    <Link to={`/item/${product.id}`}>
                        <Button className='btn btn-primary see-more'>Ver más</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}