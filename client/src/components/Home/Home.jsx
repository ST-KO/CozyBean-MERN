import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MdOutlineAddBox } from 'react-icons/md';
import '../styles.css';

const Home = () => {
    
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleLogout = () => {
        localStorage.removeItem('token');
        enqueueSnackbar('Logout Successfully', {variant: "success"});
        window.location.reload();
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const user = localStorage.getItem("token");

    return (
    <section className='menu'>
        <nav className='navbar'>
            <h1>Cozy Bean Cafe</h1>
            {
                user ?
                <button 
                className='sign-in-out_btn'
                onClick={handleLogout}
                >
                Logout
                </button> :
                <button 
                className='sign-in-out_btn'
                onClick={handleLogin}
                >
                Admin
                </button>
            }
        </nav>

        <div className='title-container'>
            <div className='title'>
                <h2>OUR MENU</h2>
                <div className='underline'></div>
            </div>
            {
                user &&
                <Link to={`/createitem`} className='create_icons'>
                    <MdOutlineAddBox />
                </Link>
            }
        </div>
        
        <Outlet />
    </section>
  );
}

export default Home