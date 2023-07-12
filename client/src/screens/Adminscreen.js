import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import Addpizza from "./Addpizza";
import Adddrink from "./Adddrink";
import Editpizza from "./Editpizza";
import Editdrink from "./Editdrink";
import Orderslist from "./Orderslist";
import Pizzaslist from "./Pizzaslist";
import Drinkslist from "./Drinkslist";
import Userslist from "./Userslist";
import Graph from "./Graph";
import { getAllOrders } from "../actions/orderActions";

export default function Adminscreen() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;

    const allOrders = useSelector((state) => state.getAllOrdersReducer);
    const { orders, loading, error } = allOrders || {}; // Add a default value of an empty object

    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <div>
            <div className="row justify-content-center p-3">
                <div className="col-md-10">
                    <h2 style={{ fontSize: "35px" }}>Panou Admin</h2>

                    <ul className="adminfunctions" style={{ backgroundColor: '#E74646' }}>
                        <li>
                            <Link to={'/admin/userslist'} style={{ color: 'white' }}>Lista utilizatori</Link>
                        </li>
                        <li>
                            <Link to={'/admin/pizzaslist'} style={{ color: 'white' }}>Lista pizza</Link>
                        </li>
                        <li>
                            <Link to={'/admin/drinkslist'} style={{ color: 'white' }}>Lista bauturi</Link>
                        </li>
                        <li>
                            <Link to={'/admin/addpizza'} style={{ color: 'white' }}>Adauga pizza</Link>
                        </li>
                        <li>
                            <Link to={'/admin/adddrink'} style={{ color: 'white' }}>Adauga bautura</Link>
                        </li>
                        <li>
                            <Link to={'/admin/orderslist'} style={{ color: 'white' }}>Lista comenzi</Link>
                        </li>
                        <li>
                            <Link to={'/admin/graph'} style={{ color: 'white' }}>Grafic vanzari</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/admin" component={Userslist} exact />
                        <Route path="/admin/userslist" component={Userslist} exact />
                        <Route path="/admin/orderslist" component={Orderslist} exact />
                        <Route path="/admin/pizzaslist" component={Pizzaslist} exact />
                        <Route path="/admin/drinkslist" component={Drinkslist} exact />
                        <Route path="/admin/addpizza" component={Addpizza} exact />
                        <Route path="/admin/adddrink" component={Adddrink} exact />
                        <Route path="/admin/editpizza/:pizzaid" component={Editpizza} exact />
                        <Route path="/admin/editdrink/:drinkid" component={Editdrink} exact />
                        <Route path='/admin/graph' exact>
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>Error: {error}</div>
                            ) : (
                                <Graph orders={orders} />
                            )}
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}
