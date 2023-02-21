import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Aboutme } from './components/Aboutme';
import { Create } from './components/Create';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { ItemListContainer } from './components/ItemListContainer';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<ItemListContainer />}></Route>
          <Route path='/category/:id' element={<ItemListContainer />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/item/:id' element={<ItemDetailContainer />}></Route>
          <Route path='/aboutme' element={<Aboutme />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
