import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDrinks } from "../actions/drinkActions";

export default function FilterDrinks() {
    const dispatch = useDispatch()
    const [searchkey, setsearchkey] = useState('')
    const [category, setcategory] = useState('all')

    return (
        <div className='container'>
            <div className="row justify-content-center shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-md-3 w-100">
                    <input
                        onChange={(e) => { setsearchkey(e.target.value) }}
                        value={searchkey} type="text" className="form-control w-100" placeholder="Cauta bauturi" />
                </div>
                <div className="col-md-3 w-100">
                    <select className="form-control w-100 mt-2" value={category} onChange={(e) => setcategory(e.target.value)}>
                        <option value="all">Toate</option>
                        <option value="apa">Apa</option>
                        <option value="racoritoare">Racoritoare</option>
                        <option value="energizant">Energizant</option>
                        <option value="bere">Bere</option>
                    </select>
                </div>
                <div className="col-md-3 w-100">
                    <button className='book-table-btn w-100 mt-2' onClick={() => { dispatch(filterDrinks(searchkey, category)) }}>FILTREAZA</button>
                </div>
            </div>
        </div>
    )
}