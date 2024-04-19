import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './signup.css';

const Signup = () => {
  
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData(prevData => ({
            ...prevData,
            [input.name]: input.value
        }));
    };

    const backendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5555';
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const url = `${backendUrl}api/users`;
            const {data: res} = await axios.post(url, data);
            navigate('/login');
            console.log(res.message);
        }catch(err){
            if(err.response
                && err.response.status >= 400
                && err.response.status <= 500){
                    setError(err.response.data.message);
            }
        }

    }
  
    return (
    <div className='signup_container'>
        <div className='signup_form_container'>
            <div className='left'>
                <h1>Welcome Back</h1>
                <Link to='/login'>
                    <button type='button' className='white_btn'>
                        Sign In
                    </button>
                </Link>
            </div>
            <div className='right'>
                <form className='form_container' onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input 
                        type="text" 
                        placeholder='Username'
                        name='username'
                        onChange={handleChange}
                        value={data.username}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.username}
                        required
                    />
                     {
                        error && 
                        <div className='error_msg'>{error}</div>
                    }
                    <button type='submit' className='green_btn'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup