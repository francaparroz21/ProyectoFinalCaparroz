import Card from 'react-bootstrap/Card';
import { ItemCount } from './ItemCount';

export const ItemProduct=({product}) =>{
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.urlImg} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <ItemCount stockProduct={product.stock}/>
            </Card.Body>
        </Card>
    );
}