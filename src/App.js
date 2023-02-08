import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Products } from './components/Products';
import { Create } from './components/Create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/category/:id' element={"asd"}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/item/:id' element={"asd"}></Route>
        {/* <Route path='/products/:productId' element={<ProductSelected/>}></Route> */}
        {/* <Route path='/login'></Route> */}
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
