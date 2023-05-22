import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drink from "../components/Drink";
import { getAllDrinks } from "../actions/drinkActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import FilterDrinks from "../components/FilterDrinks";

export default function DrinksMenu() {

    const dispatch = useDispatch();

    const drinksstate = useSelector(state => state.getAllDrinksReducer)

    const { drinks, error, loading } = drinksstate;

    useEffect(() => {
        dispatch(getAllDrinks());
    }, [])

    return (
        <div>
            <FilterDrinks />
            <div className="row justify-content-center" >

                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error='Something went wrong!' />
                ) : (
                    drinks.map((drink) => {
                        return (
                            <div className="col-md-3 m-3" key={drink._id}>
                                <div>
                                    <Drink drink={drink} />
                                </div>
                            </div>
                        );
                    })
                )}

            </div>
        </div>
    );
}