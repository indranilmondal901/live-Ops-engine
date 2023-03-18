import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Offer from './component/offerPage/Offer';
import Register from './component/register/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/offer' element={<Offer/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

