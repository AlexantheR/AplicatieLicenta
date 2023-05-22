import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDrinksCart } from "../actions/cartActions";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Drink({ drink }) {
    AOS.init({

    })

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    function addtodrinkscart() {
        dispatch(addToDrinksCart(drink, quantity))
    }

    return (
        <div
            data-aos='zoom-in'
            className="shadow p-3 mb-4 bg-white rounded"
            key={drink._id}
        >
            <div>
                <h1>{drink.name}</h1>
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
                    <button onClick={addtodrinkscart} className="btnAdd">{drink.prices[0] * quantity} RON</button>
                </div>
            </div>
        </div>
    )
}