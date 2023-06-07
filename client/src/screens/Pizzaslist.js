import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
export default function Pizzaslist() {
    const dispatch = useDispatch();

    const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

    const { pizzas, error, loading } = pizzasstate;
    useEffect(() => {
        dispatch(getAllPizzas());
    }, []);
    return <div>
        <h2>Pizzas List</h2>
        {loading && (<Loading />)}
        {error && (<Error error='Ceva nu a mers bine!' />)}

        <table className='table table-bordered table-responsive-sm'>

            <thead className='thead-dark'>
                <tr>
                    <th>Nume</th>
                    <th>Pret</th>
                    <th>Categorie</th>
                    <th>Optiuni</th>
                </tr>
            </thead>
            <tbody>
                {pizzas && pizzas.map(pizza => {

                    return <tr>
                        <td>{pizza.name}</td>
                        <td>

                            Mica : {pizza.prices[0]['mica']} <br />
                            Medie : {pizza.prices[0]['medie']} <br />
                            Mare : {pizza.prices[0]['mare']}

                        </td>
                        <td>{pizza.category}</td>
                        <td>
                            <i className='fa fa-trash m-1' onClick={() => { dispatch(deletePizza(pizza._id)) }}></i>
                            <Link to={`/admin/editpizza/${pizza._id}`}><i className='fa fa-edit m-1'></i></Link>
                        </td>

                    </tr>

                })}
            </tbody>

        </table>


    </div>;
}
