import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Orderscreen from './screens/Orderscreen';
import Adminscreen from './screens/Adminscreen'


function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
       
          <Route path="/" exact component={Homescreen} />
          <Route path="/cart" exact component={Cartscreen}/>
          <Route path="/register" exact component={Registerscreen}/>
          <Route path='/login' exact component={Loginscreen}/>
          <Route path='/orders' exact component={Orderscreen}/>
          <Route path='/admin' component={Adminscreen}/>
       
       </BrowserRouter>

    </div>
  );
}

export default App;
