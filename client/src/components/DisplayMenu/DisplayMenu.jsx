import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const DisplayMenu = ({data}) => {
    
    const [params, setParams] = useSearchParams();
    const [subFoodparams, setSubFoodParams] = useSearchParams();

    const foodType = params.get('type');
    const subFoodType = subFoodparams.get('subtype');
    const user = localStorage.getItem('token');

    const filterFood = foodType ? 
                        data?.filter(menu => menu.mainCategory === foodType) : 
                        data;

    const filterSubFood = subFoodType ? 
                            data?.filter(menu => menu?.category.some(category => category === subFoodType)) 
                            : data;

    

    const finalFilterArray = subFoodType ? filterSubFood : filterFood;
    
    // const finalFilterArray1 = subFoodType ? "filterSubFood" : "filterFood";
    // console.log(finalFilterArray1);

    const backendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5555/';
    
    const displayMenu = finalFilterArray.map(menu => (
        <article className='menu-item' key={menu._id}>
            <img src={`${backendUrl}images/${menu?.img}`} alt="menu item" className='photo' />
            <div className='item-info'>
                <header>
                    <h4>{menu.myanmarName}</h4>
                    <h4>{menu.englishName}</h4>
                </header>
                <h3 className='price'>{menu.price} Ks</h3>
                {
                    user && 
                    <div className='diplay_icons-container'>
                        <Link to={`/edititem/${menu._id}`} className='display_icons'>
                            <AiOutlineEdit/>
                        </Link>
                        <Link to={`/deleteitem/${menu._id}`} className='display_icons'>
                            <MdOutlineDelete/>
                        </Link>
                    </div>
                }
            </div>
        </article>
    )); 

    return (
    <div className='section-center'>
        {displayMenu}
    </div>
  );
}

export default DisplayMenu