import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart, addToDrinksCart, deleteDrinkFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import AOS from 'aos'
import 'aos/dist/aos.css';

export default function Cartscreen() {

    AOS.init()
    const cartstate = useSelector(state => state.cartReducer)
    const cartItems = cartstate.cartItems
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0)
    const dispatch = useDispatch();

    return (
        <div>
            <div className='row justify-content-center p-2' data-aos='fade-down'>

                <div className='col-md-6'>
                    <h2 style={{ fontSize: '40px' }}>My cart</h2>

                    {cartItems.map(item => {
                        if(!item.name.includes('ml')) 
                        {
                            return <div className='flex-container'>

                                <div className='text-left m-1 w-100'>
                                    <h1>{item.name} [{item.variant}]</h1>
                                    <h1>Price: {item.quantity} * {item.prices[0][item.variant]} = {item.price}</h1>
                                    <h1 style={{ display: 'inline' }}>Quantity: </h1>
                                    <i className="fa-solid fa-plus" aria-hidden='true' onClick={() => {
                                        dispatch(addToCart(item, item.quantity + 1, item.variant))
                                    }}></i>
                                    <b>{item.quantity}</b>
                                    <i className="fa-solid fa-minus" onClick={() => {
                                        dispatch(addToCart(item, item.quantity - 1, item.variant))
                                    }}></i>
                                    <hr></hr>
                                </div>

                                <div className='m-1 w-100'>
                                    <img src={item.image} style={{ height: '80px' }}></img>
                                </div>

                                <div className='m-1 w-100'>
                                    <i className="fa-solid fa-trash mt-5" onClick={() => { dispatch(deleteFromCart(item)) }}></i>
                                </div>
                            </div>
                        } else {
                            return <div className='flex-container'>

                            <div className='text-left m-1 w-100'>
                                <h1>{item.name}</h1>
                                <h1>Price: {item.quantity} * {item.prices[0]} = {item.price}</h1>
                                <h1 style={{ display: 'inline' }}>Quantity: </h1>
                                <i className="fa-solid fa-plus" aria-hidden='true' onClick={() => {
                                    dispatch(addToDrinksCart(item, item.quantity + 1))
                                }}></i>
                                <b>{item.quantity}</b>
                                <i className="fa-solid fa-minus" onClick={() => {
                                    dispatch(addToDrinksCart(item, item.quantity - 1))
                                }}></i>
                                <hr></hr>
                            </div>


                            <div className='m-1 w-100'>
                                <i className="fa-solid fa-trash mt-5" onClick={() => { dispatch(deleteDrinkFromCart(item)) }}></i>
                            </div>
                        </div>
                        }
                    }

                    )}
                </div>

                <div className='col-md-4 text-right'>
                    <h2 style={{ fontSize: '40px' }}>Subtotal: {subtotal} RON </h2>
                    <Checkout subtotal={subtotal} />
                </div>
            </div>
        </div>
    )
}
