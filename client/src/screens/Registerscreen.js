import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkEmailAvailability } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import { toast } from "react-toastify";

export default function Registerscreen() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const registerstate = useSelector(state => state.registerUserReducer)
    const { error, loading, success } = registerstate
    const dispatch = useDispatch()

    async function register() {
        if (name === '' || email === '' || password === '' || cpassword === '') {
            toast.error('Toate campurile sunt necesare!', {
                position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
            });
        } else if (!email.includes('@') || !email.includes('.')) {
            toast.error('Adresa de email invalida!', {
                position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
            });
        } else if (password !== cpassword) {
            toast.error('Parolele nu sunt la fel.', {
                position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
            });
        } else if (password.length < 6) {
            toast.error('Parola trebuie sa contina minim 6 caractere.', {
                position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
            });
        } else if (!/\d/.test(password)) {
            toast.error('Parola trebuie sa contina minim o cifra.', {
                position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
            });
        } else if (!/[a-zA-Z]/.test(password)) {
            toast.error('Parola trebuie sa contina minim o litera.', {
                position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
            });
        } else {
            try {
                dispatch({ type: 'CHECK_EMAIL_REQUEST' });

                const unique = await dispatch(checkEmailAvailability(email));

                if (!unique) {
                    toast.error('Adresa de email exista deja.', {
                        position: toast.POSITION.BOTTOM_CENTER // Set the toast position to bottom-center
                    });
                } else {
                    const user = {
                        name,
                        email,
                        password,
                    };

                    console.log(user);
                    dispatch(registerUser(user));
                    window.location.href = '/login';
                }
            } catch (error) {
                toast.error('Ceva nu a mers bine.');
                console.log(error);
            }
        }
    }

    return (
        <div className='register'>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">

                    {loading && (<Loading />)}
                    {success && (<Success success='Utilizatorul s-a inregistrat cu succes' />)}
                    {error && (<Error error='Adresa de email exista deja' />)}

                    <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
                        Inregistrare
                    </h2>
                    <div>
                        <input required type="text" placeholder="nume" className="form-control" value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input required type="text" placeholder="email" className="form-control" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input
                            type="password"
                            placeholder="parola"
                            className="form-control"
                            value={password}
                            required
                            onChange={(e) => { setpassword(e.target.value) }}
                        />
                        <input
                            type="password"
                            placeholder="confirmare parola "
                            className="form-control"
                            value={cpassword}
                            required
                            onChange={(e) => { setcpassword(e.target.value) }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button onClick={register} className="book-table-btn mt-3 mb-3">INREGISTRARE</button>
                        </div>
                        <p>Ai deja un cont? <a href="/login">Apasa aici pentru autentificare</a></p>

                    </div>
                </div>
            </div>
        </div>
    );
}
