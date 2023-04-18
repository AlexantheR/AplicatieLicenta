import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Orderscreen from './screens/Orderscreen';


function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Homescreen} />
          <Route path='/cart' exact Component={Cartscreen} />
          <Route path='/register' exact Component={Registerscreen} />
          <Route path='/login' exact Component={Loginscreen} />
          <Route path='/orders' exact Component={Orderscreen} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
