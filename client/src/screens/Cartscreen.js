import React, { useEffect, useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart, addToDrinksCart, deleteDrinkFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Cartscreen() {

    AOS.init()
    const cartstate = useSelector(state => state.cartReducer)
    const cartItems = cartstate.cartItems
    const [voucher, setVoucher] = useState('')
    const [appliedVoucher, setAppliedVoucher] = useState(false)
    // var subtotal = cartItems.reduce((x, item) => x + item.price, 0)
    const [subtotal, setSubtotal] = useState(0)
    const currentUser = useSelector((state) => state.loginUserReducer.currentUser)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     toast.warning('Folositi codul "voucher123" pentru a beneficia de 10% reducere!', {
    //         position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
    //     });
    // }, [])

    useEffect(() => {
        const initialSubtotal = cartItems.reduce((x, item) => {
            const isDiscounted = item.variant === 'mare' && currentUser?.isPremium;
            const price = isDiscounted ? item.price * 0.95 : item.price;
            return x + price;
        }, 0);
        setSubtotal(initialSubtotal);
    }, [cartItems, currentUser]);



    useEffect(() => {
        if (subtotal > 30) {
            toast.warning('Folositi codul "voucher123" pentru a beneficia de 10% reducere!', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }, [subtotal]);

    function applyVoucher() {
        if (voucher === 'voucher123' && !appliedVoucher) {
            const updatedSubtotal = subtotal - subtotal * 0.1;
            setSubtotal(updatedSubtotal);
            setAppliedVoucher(true);
        } else {
            toast.error('Voucher invalid!', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }

    return (
        <div>
            {cartItems.length === 0 ? (
                <div>
                    <h2 style={{ fontSize: '40px' }}>Cosul tau este gol</h2>
                    <h1>
                        <a href="/pizzamenu">Apasa aici</a> pentru a comanda produsele noastre.
                    </h1>
                </div>
            ) : (
                <div className='row justify-content-center p-2' data-aos='fade-down'>
                    <div className='col-md-6'>

                        <h2 style={{ fontSize: '40px' }}>Cosul meu</h2>

                        {cartItems.map(item => {
                            if (!item.name.includes('ml')) {
                                const isDiscounted = item.variant === "mare" && currentUser?.isPremium;
                                const price = isDiscounted ? (item.price * 0.95) : item.price;
                                const priceDisplay = ` ${isDiscounted ? (item.prices[0][item.variant] * 0.95) :
                                    item.prices[0][item.variant]} * ${item.quantity} = ${price}`;

                                return <div className='flex-container'>

                                    <div className='text-left m-1 w-100'>
                                        <h1>{item.name} [{item.variant}]</h1>
                                        <h1>Pret: {priceDisplay}</h1>
                                        <h1 style={{ display: 'inline' }}>Cantitate: </h1>
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
                                        <h1>Pret: {item.quantity} * {item.prices[0]} = {item.price.toFixed(2)}</h1>
                                        <h1 style={{ display: 'inline' }}>Cantitate: </h1>
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
                                        <img src={item.image} style={{ height: '100px' }}></img>
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
                        <h2 style={{ fontSize: '40px' }}>Total: {subtotal.toFixed(2)} RON </h2>
                        <Checkout subtotal={subtotal} />

                        {appliedVoucher ?
                            <h1 id='voucher-apply'>Voucher aplicat cu succes!</h1>
                            : <div>
                                <input
                                    id='voucher'
                                    type='text'
                                    placeholder='Voucher'
                                    value={voucher}
                                    onChange={(e) => { setVoucher(e.target.value) }}
                                    style={{ marginBottom: '8px' }}
                                ></input>
                                <br></br>
                                <button className='book-table-btn' onClick={applyVoucher}
                                >Aplica voucher
                                </button>
                            </div>
                        }
                    </div>
                </div>
            )}

        </div >
    )
}
