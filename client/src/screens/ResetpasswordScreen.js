import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'

export default function ResetpasswordScreen() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const forgotPasswordState = useSelector(state => state.forgotPasswordReducer)
    const { error, loading, success } = forgotPasswordState
    const dispatch = useDispatch()

    async function updatePassword() {
        if (email === '' || password === '' || cpassword === '') {
            alert('Toate campurile sunt necesare!');
        } else if (!email.includes('@') || !email.includes('.')) {
            alert('Adresa de email invalida!');
        } else if (password !== cpassword) {
            alert('Parolele nu sunt la fel.');
        } else if (password.length < 6) {
            alert('Parola trebuie sa contina minim 6 caractere.');
        } else if (!/\d/.test(password)) {
            alert('Parola trebuie sa contina minim o cifra.');
        } else if (!/[a-zA-Z]/.test(password)) {
            alert('Parola trebuie sa contina minim o litera.');
        } else {
            try {
                dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });

                const user = { email, password }
                const response = await dispatch(forgotPassword(user));
                console.log(response);

                if (response.error) {
                    alert('Ceva nu a mers bine.');
                } else {
                    alert('Parola a fost resetata cu succes!');
                    window.location.href = '/login';
                }
            } catch (error) {
                alert('Ceva nu a mers bine.');
                console.log(error);
            }
        }
    }

    return (
        <div className='reset-password'>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">

                    {loading && (<Loading />)}
                    {success && (<Success success='Parola a fost resetata cu succes!' />)}
                    {error && (<Error error={error} />)}

                    <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
                        Resetare parola
                    </h2>
                    <div>
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
                        <button onClick={updatePassword} className="btnRegister mt-3 mb-3">Schimba parola</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
