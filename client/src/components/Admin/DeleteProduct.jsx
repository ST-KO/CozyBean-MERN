import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const DeleteProduct = () => {

    const [data, setData] = useState();
    
    const params = useParams();
    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5555';
    useEffect(() => {
        axios.get(`${backendUrl}api/products/${params.id}`)
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleUpload = (e) => {
       
        axios.delete(`${backendUrl}api/products/${params.id}`)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err))
    };


return (
    <div className='menu'>
            <div className='title'>
                <h2>Are You Sure You Want To Delete This ?</h2>
                <div className='underline'></div>
            </div>
            {
                data &&
                <article className='postview-menu-item' id={data._id}>
                    <img src={`${backendUrl}images/${data?.img}`} alt="menu item" className='postview-photo' />
                    <div className='item-info'>
                        <header>
                            <h4>{data.myanmarName}</h4>
                            <h4>{data.englishName}</h4>
                        </header>
                        <h4 className='price'>{data.price} Ks</h4>
                    </div>
                    <button onClick={handleUpload} className='button'>Delete</button>
                    
                </article>
        }
    </div>
  );
}

export default DeleteProduct;