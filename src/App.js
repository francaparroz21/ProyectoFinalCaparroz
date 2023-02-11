import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Create } from './components/Create';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { ItemListContainer } from './components/ItemListContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}></Route>
        <Route path='/category/:id' element={<ItemListContainer/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/item/:id' element={<ItemDetailContainer/>}></Route>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
