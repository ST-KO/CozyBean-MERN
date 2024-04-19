import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { BsArrowLeft } from 'react-icons/bs';
import './login.css';

const Login = () => {
  
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

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
            const url = `${backendUrl}api/auth`;
            const {data: res} = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            enqueueSnackbar('Login Successfully', {variant: "success"});
            // window.location = '/';

            navigate('/');
        }catch(err){
            if(err.response
                && err.response.status >= 400
                && err.response.status <= 500){
                    setError(err.response.data.message);
            }
        }

    }
  
    return (
    <div className='login_container'>
        <Link to={`/`} className='login_back_icons'>
            <BsArrowLeft/>
            <h6>Back to Menu Page</h6>
        </Link>
        <div className='login_form_container'>
            <div className='left'>
                <form className='form_container' onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>
                    <div className='form_container_input'>
                        <input 
                            type="text" 
                            placeholder='Username'
                            name='username'
                            onChange={handleChange}
                            value={data.username}
                            className='input'
                            autoComplete='on'
                            required
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            className='input'
                            autoComplete='off'
                            required
                        />
                        {
                            error && 
                            <div className='error_msg'>{error}</div>
                        }
                    </div>
                    <button type='submit' className='signin_btn'>
                        Sign In
                    </button>
                </form>
            </div>
            {/* <div className='right'>
            <h1>New Here ?</h1>
                <Link to='/signup'>
                    <button type='button' className='white_btn'>
                        Sign Up
                    </button>
                </Link>
              
            </div> */}
        </div>
    </div>
    
  )
}

export default Login;
