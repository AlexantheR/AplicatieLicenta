import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../actions/userActions";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  const cartstate = useSelector(state => state.cartReducer)
  const userstate = useSelector(state => state.loginUserReducer)
  const { currentUser } = userstate
  const dispatch = useDispatch()

  return (
    <Navbar sticky="top" expand="lg" className="navbar">
      <Container>
        <div className="navbar-brand">
          <Navbar.Brand href="/">MIZZA PIZZA</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <div className="navbarPageLinks">
              <Nav.Link href="/pizzamenu">Pizza</Nav.Link>
              <Nav.Link href="/drinks">Bauturi</Nav.Link>
              <Nav.Link href="/mainbook">Rezervare</Nav.Link>
            </div>
          </Nav>

          <ul className="navbar-nav ml-auto">

            {currentUser ? (

              <div className="dropdown show mt-2">
                <a className="dropdown-toggle" type="button" 
                  id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  {currentUser.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a className="dropdown-item" href="/orders">Comenzile mele</a>{
                  (currentUser.isAdmin==1 ? (<a className="dropdown-item" href="/admin">Panou Admin</a>):null)}                  
                  <a className="dropdown-item" href="#"
                    onClick={() => { dispatch(logoutUser()) }}>
                    <li>Deconectare</li></a>
                </div>
              </div>

            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Autentificare
                </a>
              </li>)}
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                Cos {cartstate.cartItems.length}
              </a>
            </li>
          </ul>

        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default NavigationBar;