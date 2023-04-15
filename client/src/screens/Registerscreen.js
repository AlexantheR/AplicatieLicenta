import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'

export default function Registerscreen() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [Cpassword, setCpassword] = useState('')
    const registerstate = useSelector(state => state.registerUserReducer)
    const { error, loading, success } = registerstate
    const dispatch = useDispatch()

    function register() {

        if (password != Cpassword) {
            alert('Passwords do not match');
        }
        else {
            const user = {
                name,
                email,
                password
            }
            console.log(user)
            dispatch(registerUser(user))
        }
    }

    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded'>

                    {loading && (<Loading />)}
                    {success && (<Success success='User registered succesfully' />)}
                    {error && (<Error error='Email alreay exists' />)}

                    <h2 className='text-center m-2' style={{ fontSize: '35px' }}>Register</h2>
                    <div>
                        <input required type='text' placeholder='Name' className='form-control'
                            value={name} onChange={(e) => setname(e.target.value)} />
                        <input required type='text' placeholder='Email' className='form-control'
                            value={email} onChange={(e) => setemail(e.target.value)} />
                        <input required type='text' placeholder='Password' className='form-control'
                            value={password} onChange={(e) => setpassword(e.target.value)} />
                        <input required type='text' placeholder='Confirm password' className='form-control'
                            value={Cpassword} onChange={(e) => setCpassword(e.target.value)} />
                        <button onClick={register} className='btnRegister mt-3'>REGISTER</button>
                        <a href='/login' className='registerLoginLink mt-2'>Click here to Login</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
