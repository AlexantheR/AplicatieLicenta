import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addDrink } from "../actions/drinkActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'


export default function Adddrink() {
    const [name, setname] = useState("");
    const [prices, setprices] = useState();
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");

    const dispatch = useDispatch()
    const adddrinkstate = useSelector(state => state.addDrinkReducer)
    const { success, error, loading } = adddrinkstate

    function formHandler(e) {

        e.preventDefault();

        const drink = {
            name,
            image,
            category,
            prices,
        }

        console.log(drink);
        dispatch(addDrink(drink));
    }

    return (
        <div>
            <div className='text-left shadow-lg p-3 mb-5 bg-white rounded'>
                <h1>Add Drink</h1>

                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {success && (<Success success='New Drink added successfully' />)}

                <form onSubmit={formHandler}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="price"
                        value={prices}
                        onChange={(e) => {
                            setprices(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="category"
                        value={category}
                        onChange={(e) => {
                            setcategory(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="image url"
                        value={image}
                        onChange={(e) => {
                            setimage(e.target.value);
                        }}
                    />
                    <button type="submit" className="btnAdd mt-3">Add Drink</button>
                </form>
            </div>
        </div>
    )
}