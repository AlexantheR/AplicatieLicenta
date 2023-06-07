import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
export default function Orderslist() {
    const dispatch = useDispatch();
    const getordersstate = useSelector((state) => state.getAllOrdersReducer);
    const { loading, error, orders } = getordersstate;
    useEffect(() => {
        dispatch(getAllOrders());
    }, []);
    return (
        <div>
            {loading && <Loading />}
            {error && <Error error="Ceva nu a mers bine!" />}
            <table className="table table-striped table-bordered table-responsive-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Id comanda</th>
                        <th>Email</th>
                        <th>Id utilizator</th>
                        <th>Suma</th>
                        <th>Data</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders &&
                        orders.map((order) => {
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.email}</td>
                                    <td>{order.userid}</td>
                                    <td>{order.orderAmount}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>
                                        {order.isDelivered ? (
                                            <h1>Comanda trimisa</h1>
                                        ) : (
                                            <button className="btnDeliver" onClick={() => { dispatch(deliverOrder(order._id)) }}>Trimite comanda</button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
