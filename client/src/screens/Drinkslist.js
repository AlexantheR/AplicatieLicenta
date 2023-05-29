import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDrink, getAllDrinks } from "../actions/drinkActions";
import Error from "../components/Error";
import Loading from "../components/Loading";


export default function Drinkslist() {
    const dispatch = useDispatch();

    const drinksstate = useSelector((state) => state.getAllDrinksReducer);

    const { drinks, error, loading } = drinksstate;
    useEffect(() => {
        dispatch(getAllDrinks());
    }
        , []);

    return <div>
        <h2>Drinks List</h2>
        {loading && (<Loading />)}
        {error && (<Error error='Something went wrong' />)}

        <table className='table table-bordered table-responsive-sm'>

            <thead className='thead-dark'>
                <tr>
                    <th>Name</th>
                    <th>Prices</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {drinks && drinks.map(drink => {

                    return <tr>
                        <td>{drink.name}</td>
                        <td>
                            {drink.prices[0]}
                        </td>
                        <td>{drink.category}</td>
                        <td>
                            <i className='fa fa-trash m-1' onClick={() => { dispatch(deleteDrink(drink._id)) }}></i>
                            <Link to={`/admin/editdrink/${drink._id}`}><i className='fa fa-edit m-1'></i></Link>
                        </td>

                    </tr>

                }
                )}
            </tbody>
        </table>
    </div>
}