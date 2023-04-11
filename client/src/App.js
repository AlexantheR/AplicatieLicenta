import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';


function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Homescreen} />
          <Route path='/cart' exact Component={Cartscreen} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
