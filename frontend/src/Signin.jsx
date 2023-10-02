import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate('/');
                }
                else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginpage'>
            <div className=' p-3 rounded w-25 border loginform text-white'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                            onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" placeholder='Enter password' name='password'
                            onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                </form>
                {/* Remove the "Create Account" button */}
                <p>You agree to our terms and policies</p>
                {/* Add a link to the NewAdmin page */}
                <Link to="/NewAdmin" className='btn btn-primary w-20 rounded-50'>
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default Signin;
