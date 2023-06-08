import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Checkout from '../components/Checkout';

export default function PaymentScreen() {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card payment

    const location = useLocation();
    const subtotal = location.state?.subtotal || 0;

    const handlePayment = () => {
        // Handle the payment logic based on the chosen payment method (cash or card)
        if (paymentMethod === 'cash') {
            // Handle cash payment logic
            console.log('Plata cash');
        } else {
            // Handle card payment logic
            console.log('Plata card');
        }
        // Additional logic such as saving the payment details and navigating to the success screen
    };

    return (
        <div>
            <h2 style={{ fontSize: '40px' }}>Total: {subtotal} RON </h2>

            <form>
                <div>
                    <input
                        type="text"
                        id="name"
                        placeholder='nume'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="street"
                        placeholder='strada'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="city"
                        placeholder='oras'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="country"
                        placeholder='tara'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="pincode"
                        placeholder='cod postal'
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="paymentMethod">Metoda de plata:</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <button type="button" onClick={handlePayment}>
                    Plateste
                </button>
            </form>
            <Checkout subtotal={subtotal} />
            <Link to="/cart">Inapoi la cos</Link>
        </div>
    );
}
