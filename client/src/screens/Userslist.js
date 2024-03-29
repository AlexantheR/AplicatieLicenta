import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deleteUser, getAllUsers, makeUserPremium, loseUserPremium } from '../actions/userActions';

export default function Userslist() {
    const dispatch = useDispatch();
    const usersstate = useSelector(state => state.getAllUsersReducer);
    const { error, loading, users } = usersstate;

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const handlePremium = (email, isPremium) => {
        if (isPremium) {
            dispatch(loseUserPremium(email));            
        } else {
            dispatch(makeUserPremium(email));            
        }
    };

    return (
        <div>
            <h1>Lista utilizatori</h1>
            {loading && <Loading />}
            {error && <Error error="Ceva nu a mers bine!" />}
            <table className='table table-striped table-bordered table-responsive-sm'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Id utilizator</th>
                        <th>Nume</th>
                        <th>Email</th>
                        <th>Sterge</th>
                        <th>Premium</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><i className='fa fa-trash' onClick={() => { dispatch(deleteUser(user._id)) }}></i></td>
                            {user.isPremium ? <td><button className="book-table-btn" onClick={() => handlePremium(user.email, user.isPremium)}>Inceteaza premium</button></td>
                                : <td><button className="book-table-btn" onClick={() => handlePremium(user.email, user.isPremium)}>Promoveaza utilizator</button></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
