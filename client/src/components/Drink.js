import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDrinksCart } from "../actions/cartActions";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from "react-toastify";

export default function Drink({ drink }) {
    AOS.init({

    })

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.loginUserReducer.currentUser)


    function dispatchAddToDrinksCart() {
        dispatch(addToDrinksCart(drink, quantity))
    }

    function handleOrder() {
        if (currentUser) {
            dispatchAddToDrinksCart()
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

    return (
        <div
            data-aos='zoom-in'
            className="shadow p-3 mb-4 bg-white rounded"
            key={drink._id}
        >
            <div>
                <h1>{drink.name}</h1>

                <img
                    src={drink.image}
                    className="img-fluid"
                    style={{ height: "200px", width: "250px" }}
                />
            </div>

            <div className="drink-grid-container">
                <div className="m-1 w-70">
                    <select
                        className="form-control"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                    >
                        {[...Array(20).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1}</option>;
                        })}
                    </select>

                </div>

                <div className="m-1 w-100">
                    <button onClick={handleOrder} className="book-table-btn">{drink.prices[0] * quantity} RON</button>
                </div>
            </div>
        </div>
    )
}