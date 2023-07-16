import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from "react-toastify";

export default function Pizza({ pizza }) {
  AOS.init();

  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("mica");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.loginUserReducer.currentUser);

  function dispatchAddToCart() {
    dispatch(addToCart(pizza, quantity, variant));
  }

  function handleOrder() {
    if (currentUser) {
      dispatchAddToCart();
    } else {
      toast.error('Va rugam sa va logati pentru a putea comanda!', {
        position: toast.POSITION.BOTTOM_CENTER, // Set the toast position to bottom-center
        autoClose: 3000
      });
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to the login page after 3 seconds
      }, 3000);
    }
  }

  const calculateDiscountedPrice = () => {
    if (variant === "mare" && currentUser?.isPremium) {
      const originalPrice = pizza.prices[0][variant] * quantity;
      const discountedPrice = originalPrice * 0.90;
      const discountAmount = originalPrice - discountedPrice;

      return (
        <span>
          <span className="original-price">{originalPrice.toFixed(2)} RON</span>
          <br />
          <span className="discounted-price">{discountedPrice.toFixed(2)} RON</span>
          <br />
          <p className="procent-reducere">(<b>10%</b> DISCOUNT)</p>
        </span>
      );
    }

    return `${(pizza.prices[0][variant] * quantity).toFixed(2)} RON`;
  };

  return (
    <div
      data-aos='zoom-in'
      className="shadow p-3 mb-5 bg-white rounded"
      key={pizza._id}
    >
      <div onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img
          src={pizza.image}
          className="img-fluid"
          style={{ height: "200px", width: "250px" }}
        />
      </div>

      <div className="flex-container">
        <div className="m-1 w-100">
          <p>Variante</p>
          <select
            className="form-control"
            value={variant}
            onChange={(e) => {
              setVariant(e.target.value);
            }}
          >
            {pizza.variants.map((variant) => {
              return <option value={variant}>{variant}</option>;
            })}
          </select>
        </div>

        <div className="m-1 w-100">
          <p>Cantitate</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">
            Pret: {calculateDiscountedPrice()}
          </h1>
        </div>

        <div className="m-1 w-100">
          <button className="book-table-btn" onClick={handleOrder}>COMANDA</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={pizza.image}
            className="img-fluid"
            style={{ height: "400px" }}
          ></img>
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="book-table-btn" onClick={handleClose}>
            INCHIDE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
