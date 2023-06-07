import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders, cancelOrder } from '../actions/orderActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Orderscreen() {
  AOS.init();
  const dispatch = useDispatch();
  const orderstate = useSelector(state => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const handleCancelOrder = orderId => {
    if (window.confirm('Sigur doriti sa anulati comanda?')) {
      dispatch(cancelOrder(orderId));
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '35px' }}>Comenzile mele</h2>
      <hr />
      <div className='row justify-content-center'>
        {loading && <Loading />}
        {error && <Error error='Ceva nu a mers bine!' />}
        {orders &&
          orders.map(order => (
            <div
              className='col-md-8 m-2 p-1'
              style={{ backgroundColor: '#e74c3c', color: 'white' }}
              key={order._id}
            >
              <div className='flex-container'>
                <div className='text-left w-100 m-1'>
                  <h2 style={{ fontSize: '25px' }}>Produse</h2>
                  <hr />
                  {order.orderItems.map(item => (
                    <div key={item._id}>
                      {!item.name.includes('ml') ? (
                        <p>
                          {item.name} [{item.variant}] * {item.quantity} = {item.price}
                        </p>
                      ) : (
                        <p>
                          {item.name} * {item.quantity} = {item.price}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className='text-left w-100 m-1'>
                  <h2 style={{ fontSize: '25px' }}>Adresa</h2>
                  <hr />
                  <p>Strada: {order.shippingAddress.street}</p>
                  <p>Oras: {order.shippingAddress.city}</p>
                  <p>Tara: {order.shippingAddress.country}</p>
                  <p>Cod postal: {order.shippingAddress.pincode}</p>
                </div>

                <div className='text-left w-100 m-1'>
                  <h2 style={{ fontSize: '25px' }}>Informatii comanda</h2>
                  <hr />
                  <p>Suma comenzii: {order.orderAmount} RON</p>
                  <p>Data: {order.createdAt.substring(0, 10)}</p>
                  <p>Id tranzactie: {order.transactionId}</p>
                  <p>Id comanda: {order._id}</p>
                  {order.isDelivered ? (<button
                    className='book-table-btn'
                    onClick={() => {
                      handleCancelOrder(order._id)
                      window.location.reload()
                    }                    }
                  >
                    Anuleaza comanda
                  </button>) :
                    <h1>Comanda netrimisa</h1>}

                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
