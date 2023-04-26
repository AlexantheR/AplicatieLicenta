import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDrinksCart } from "../actions/cartActions";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Drinks({ drink }) {
    AOS.init({

    })

    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    function addtodrinkscart() {
        dispatch(addToDrinksCart(drink, quantity))
    }

    return (
        <div
            data-aos='zoom-in'
            className="shadow p-3 mb-5 bg-white rounded"
            key={drink._id}
        >
            <div onClick={handleShow}>
                <h1>{drink.name}</h1>
            </div>

            <div className="flex-container">
                <div className="m-1 w-100">
                    <p>Quantity</p>
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
            </div>

            <div className="flex-container">
                <div className="m-1 w-100">
                    <h1 className="mt-1">
                        Price: {drink.price * quantity} RON
                    </h1>
                </div>

                <div className="m-1 w-100">
                    <button onClick={addtodrinkscart} className="btnAdd">Add to cart</button>
                </div>
            </div>
        </div>
    )
}