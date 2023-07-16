import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderCard, placeOrderRamburs } from '../actions/orderActions';
import Loading from '../components/Loading';
import Success from '../components/Success';
import Error from '../components/Error';
import { toast } from 'react-toastify';

export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const currentUser = useSelector((state) => state.loginUserReducer.currentUser);

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  async function tokenHandler(token) {
    console.log(token);
    if (currentUser) {
      if (paymentMethod === 'card') {
        dispatch(placeOrderCard(token, subtotal));
      } else if (paymentMethod === 'ramburs') {
        if (!street || !city || !country || !pincode) {
          toast.error('Va rugam sa completati toate detaliile adresei!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000
          });
        } else {
          const orderDetails = {
            subtotal,
            currentUser,
            token: {
              street,
              city,
              country,
              pincode
            },
          };
          dispatch(placeOrderRamburs(orderDetails));
        }
      }
    } else {
      toast.error('Va rugam sa va logati pentru a putea comanda!', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }
  }

  const handleCityChange = (e) => {
    const inputValue = e.target.value;
    const lettersOnly = /^[A-Za-z\s]+$/; // Regular expression to match only letters and spaces
    if (lettersOnly.test(inputValue) || inputValue === '') {
      setCity(inputValue);
    }
  };

  const handleCountryChange = (e) => {
    const inputValue = e.target.value;
    const lettersOnly = /^[A-Za-z\s]+$/; // Regular expression to match only letters and spaces
    if (lettersOnly.test(inputValue) || inputValue === '') {
      setCountry(inputValue);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Ceva nu a mers bine!" />}
      {success && <Success success="Comanda a fost plasata cu succes!" />}

      <div>
        <input
          type="radio"
          id="card"
          value="card"
          name="paymentMethod"
          checked={paymentMethod === 'card'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="card">Card</label>
      </div>

      <div>
        <input
          type="radio"
          id="ramburs"
          value="ramburs"
          name="paymentMethod"
          checked={paymentMethod === 'ramburs'}
          onChange={handlePaymentMethodChange}
        />
        <label htmlFor="ramburs">Ramburs</label>
      </div>

      {paymentMethod === 'card' ? (
        <StripeCheckout
          amount={subtotal * 100}
          shippingAddress
          token={tokenHandler}
          stripeKey="pk_test_51MxrSbBLFgjsWwKCRKsXXygticOx7Q961jmSeGXuSGJyM7SlZ3XClkSWn0idUqskONrUw7IqEOC0uz9vs1rCWeCu00152iWCYs"
          currency="RON"
        >
          <button className="book-table-btn">Plateste card</button>
        </StripeCheckout>
      ) : (
        <div>
          <input
            type="text"
            placeholder="strada"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="oras"
            value={city}
            onChange={handleCityChange}
            required
          />
          <br />
          <input
            type="text"
            placeholder="tara"
            value={country}
            onChange={handleCountryChange}
            required
          />
          <br />
          <input
            type="text"
            placeholder="cod postal"
            value={pincode}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, "");
              input = input.slice(0, 6);
              setPincode(input);
            }}
            required
          />

          <br />
          {(!street || !city || !country || !pincode) && (
            <p>*Pentru a putea da comanda, va rugam completati toate detaliile necesare.</p>
          )}
          <button
            className="book-table-btn"
            onClick={tokenHandler}
            disabled={!street || !city || !country || !pincode}
          >
            {(!street || !city || !country || !pincode) ? 'Adresa incompleta' : 'Plateste ramburs'}
          </button>
        </div>
      )}
    </div>
  );
}
