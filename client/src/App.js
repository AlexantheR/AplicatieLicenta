import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/Navbar';
import PizzaMenu from './screens/PizzaMenu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Orderscreen from './screens/Orderscreen';
import Adminscreen from './screens/Adminscreen';
import FirstPage from './screens/FirstPage';
import DrinksMenu from './screens/DrinksMenu';
import MainBook from './screens/MainBook';
import Book from './screens/Book';
import ThankYou from './screens/ThankYou';
import PaymentScreen from './screens/PaymentScreen';
import ResetpasswordScreen from './screens/ResetpasswordScreen';


function App() {
  
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>      
        <Route path="/" exact component={FirstPage} />
        <Route path="/PizzaMenu" exact component={PizzaMenu} />
        <Route path="/cart" exact component={Cartscreen} />
        <Route path="/register" exact component={Registerscreen} />
        <Route path='/login' exact component={Loginscreen} />
        <Route path='/orders' exact component={Orderscreen} />
        <Route path='/admin' component={Adminscreen} />
        <Route path='/drinks' exact component={DrinksMenu} />
        <Route path='/mainbook' exact component={MainBook} />
        <Route path='/book' exact component={Book} />
        <Route path='/thankyou' exact component={ThankYou} />
        <Route path='/payment' exact component={PaymentScreen} />
        <Route path='/forgotpassword' exact component={ResetpasswordScreen} />
      </BrowserRouter>

    </div>
  );
}

export default App;
