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
import Book from './screens/Book';
import ThankYou from './screens/ThankYou';
import PaymentScreen from './screens/PaymentScreen';
import Makeuserpremium from './screens/MakeUserPremium';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <BrowserRouter>
        <Route path="/" exact component={FirstPage} />
        <Route path="/PizzaMenu" exact component={PizzaMenu} />
        <Route path="/cart" exact component={Cartscreen} />
        <Route path="/register" exact component={Registerscreen} />
        <Route path='/login' exact component={Loginscreen} />
        <Route path='/orders' exact component={Orderscreen} />
        <Route path='/admin' component={Adminscreen} />
        <Route path='/drinks' exact component={DrinksMenu} />
        <Route path='/book' exact component={Book} />
        <Route path='/thankyou' exact component={ThankYou} />
        <Route path='/payment' exact component={PaymentScreen} />
        <Route path='/makeuserpremium' exact component={Makeuserpremium} />
      </BrowserRouter>

    </div>
  );
}

export default App;
