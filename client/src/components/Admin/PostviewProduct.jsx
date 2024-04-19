import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';

import './styles.css';

const PostviewProduct = () => {

    const [data, setData] = useState();
    const params = useParams();

    const backendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5555/';
    useEffect(() => {
        axios.get(`${backendUrl}api/products/${params.id}`)
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


return (
    <div className='menu'>
            <div className='title'>
                <h2>Menu Added</h2>
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
                    <div className='icon-section'>
                        <Link to={`/`} className='icons'>
                            <BsArrowLeft/>
                        </Link>
                        <Link to={`/edititem/${params.id}`} className='icons'>
                            <AiOutlineEdit/>
                        </Link>
                        <Link to={`/deleteitem/${params.id}`} className='icons'>
                            <MdOutlineDelete/>
                        </Link>
                    </div>
                    
                </article>
        }
    </div>
  );
}

export default PostviewProduct