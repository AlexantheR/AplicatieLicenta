import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'

export default function Registerscreen() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const registerstate = useSelector(state => state.registerUserReducer)
    const { error, loading, success } = registerstate
    const dispatch = useDispatch()
    
    async function register() {

        if (password !== cpassword) {
            alert("parolele nu sunt la fel")
        }
        else {
            const user = {
                name,
                email,
                password
            }
            console.log(user);
            dispatch(registerUser(user))
        }
        window.location.href = '/login'
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
                        <button onClick={register} className="btnRegister mt-3 mb-3">INREGISTRARE</button>
                        <br />
                        <p>Ai deja un cont? </p>
                        <a href="/login">Apasa aici pentru autentificare</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
