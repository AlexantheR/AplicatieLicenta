
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function Loginscreen() {


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const loginstate = useSelector(state => state.loginUserReducer)
  const { loading, error } = loginstate
  const dispatch = useDispatch()

  useEffect(() => {

    if (localStorage.getItem('currentUser')) {
      window.location.href = '/'
    }

  }, [])

  async function login() {
    const user = { email, password }
    dispatch(loginUser(user))
  }

  return (
    <div className='login'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Autentificare
          </h2>

          {loading && (<Loading />)}
          {error && (<Error error='Credentiale invalide' />)}

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

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button onClick={login} className="book-table-btn mt-3 mb-3">AUTENTIFICARE</button>
            </div>
            <p>Nu ai un cont? <a href="/register">Apasa aici pentru inregistrare</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
