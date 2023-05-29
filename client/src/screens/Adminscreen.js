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

export default function Adminscreen() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div>
            <div className="row justify-content-center p-3">
                <div className="col-md-10">
                    <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>

                    <ul className="adminfunctions">
                        <li>
                            <Link to={'/admin/userslist'} style={{ color: 'white' }}>Users List</Link>
                        </li>
                        <li>
                            <Link to={'/admin/pizzaslist'} style={{ color: 'white' }}>Pizzas List</Link>
                        </li>
                        <li>
                            <Link to={'/admin/drinkslist'} style={{ color: 'white' }}>Drinks List</Link>
                        </li>
                        <li>
                            <Link to={'/admin/addpizza'} style={{ color: 'white' }}>Add Pizza</Link>
                        </li>
                        <li>
                            <Link to={'/admin/adddrink'} style={{ color: 'white' }}>Add Drink</Link>
                        </li>
                        <li>
                            <Link to={'/admin/orderslist'} style={{ color: 'white' }}>Orders List</Link>
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
                    </Switch>

                </div>
            </div>
        </div>
    );
}
