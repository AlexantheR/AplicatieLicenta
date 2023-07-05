import { React, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderCard, placeOrderRamburs } from '../actions/orderActions';
import Loading from '../components/Loading';
import Success from '../components/Success';
import Error from '../components/Error';

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
    if (currentUser && paymentMethod === 'card') {
      dispatch(placeOrderCard(token, subtotal));
    } else if (paymentMethod === 'ramburs') {
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
    } else {
      alert('Va rugam sa va logati pentru a putea comanda!');
      window.location.href = '/login';
    }
  }


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
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="tara"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="cod postal"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <br />
          <br />
          <button className="book-table-btn" onClick={tokenHandler}>
            Plateste ramburs
          </button>
        </div>
      )}
    </div>
  );
}
