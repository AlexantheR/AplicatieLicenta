import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addPizza } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
export default function Addpizza() {
    const [name, setname] = useState("");
    const [smallprice, setsmallprice] = useState();
    const [mediumprice, setmediumprice] = useState();
    const [largeprice, setlargeprice] = useState();
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");
    const [category, setcategory] = useState("");

    const dispatch = useDispatch()

    const addpizzastate = useSelector(state => state.addPizzaReducer)
    const { success, error, loading } = addpizzastate
    function formHandler(e) {

        e.preventDefault();

        const pizza = {
            name,
            image,
            description,
            category,
            prices: {
                mica: smallprice,
                medie: mediumprice,
                mare: largeprice
            }
        }

        console.log(pizza);
        dispatch(addPizza(pizza));

    }

    return (
        <div>
            <div className='text-left shadow-lg p-3 mb-5 bg-white rounded'>
                <h1>Adauga pizza</h1>

                {loading && (<Loading />)}
                {error && (<Error error='Ceva nu a mers bine!' />)}
                {success && (<Success success='Pizza noua adaugata cu succes' />)}

                <form onSubmit={formHandler}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="denumire"
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="pret varianta mica"
                        value={smallprice}
                        onChange={(e) => {
                            setsmallprice(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="pret varianta medie"
                        value={mediumprice}
                        onChange={(e) => {
                            setmediumprice(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="pret varianta mare"
                        value={largeprice}
                        onChange={(e) => {
                            setlargeprice(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="categorie"
                        value={category}
                        onChange={(e) => {
                            setcategory(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="descriere"
                        value={description}
                        onChange={(e) => {
                            setdescription(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="url imagine"
                        value={image}
                        onChange={(e) => {
                            setimage(e.target.value);
                        }}
                    />
                    <button className="book-table-btn" type='submit'>Adauga pizza</button>
                </form>
            </div>
        </div>
    );
}
