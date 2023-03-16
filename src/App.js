import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Aboutme } from './components/aboutme/Aboutme';
import { ItemDetailContainer } from './components/itemdetailcontainer/ItemDetailContainer';
import { ItemListContainer } from './components/itemlistcontainer/ItemListContainer';
import { CartProvider } from './context/cartContext/CartContext';
import { Navbar } from './components/navbar/Navbar';
import { Cart } from './components/cart/Cart';
import { Footer } from './components/footer/Footer';
import { Checkout } from './components/checkout/Checkout';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<ItemListContainer />}></Route>
          <Route path='/category/:id' element={<ItemListContainer />}></Route>
          <Route path='/item/:id' element={<ItemDetailContainer />}></Route>
          <Route path='/aboutme' element={<Aboutme />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
        </Routes>
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
