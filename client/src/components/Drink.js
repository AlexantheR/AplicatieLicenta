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
    const currentUser = useSelector((state) => state.loginUserReducer.currentUser)


    function dispatchAddToDrinksCart() {
        dispatch(addToDrinksCart(drink, quantity))
    }

    function handleOrder(){
        if(currentUser){
            dispatchAddToDrinksCart()
        }else{
          alert('Va rugam sa va logati pentru a putea comanda!')
          window.location.href = '/login'
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