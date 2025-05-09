import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDrink, getDrinkById } from "../actions/drinkActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Editdrink({ match }) {
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    const [prices, setprices] = useState();
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");

    const getDrinkByIdState = useSelector((state) => state.getDrinkByIdReducer);

    const { drink, error, loading } = getDrinkByIdState;

    const editDrinkState = useSelector((state) => state.editDrinkReducer);
    const { editloading, editsuccess, editerror } = editDrinkState;

    useEffect(() => {
        if (drink) {
            if (drink._id == match.params.drinkid) {
                setname(drink.name);
                setcategory(drink.category);
                setprices(drink.prices[0]);
                setimage(drink.image);
            } else {
                dispatch(getDrinkById(match.params.drinkid));
            }
        } else {
            dispatch(getDrinkById(match.params.drinkid));
        }
    }, [drink, dispatch]);

    function formHandler(e) {
        e.preventDefault();

        const editedDrink = {
            _id: match.params.drinkid,
            name,
            image,
            category,
            prices,
        };

        dispatch(editDrink(editedDrink));
    }


    return (
        <div>
            <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
                <h1>Editeaza bautura</h1>
                {loading && <Loading />}
                {error && <Error error="Ceva nu a mers bine!" />}
                {editsuccess && <Success success="Bautura editata cu succes!" />}
                {editloading && <Loading />}

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
                        placeholder="pret"
                        value={prices}
                        onChange={(e) => {
                            setprices(e.target.value);
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
                        placeholder="url imagine"
                        value={image}
                        onChange={(e) => {
                            setimage(e.target.value);
                        }}
                    />
                    <button className="btnEdit mt-3" type="submit">Editeaza bautura</button>
                </form>
            </div>
        </div>
    )
}