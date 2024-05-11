import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DisplayMenu from '../DisplayMenu/DisplayMenu';

const Buttons = () => {

    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState([]);
    const [params, setParams] = useSearchParams();
    const [subFoodparams, setSubFoodParams] = useSearchParams();

    const foodType = params.get('type');
    const subFoodType = subFoodparams.get('subtype');

    const backendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5555/';
    const url = `${backendUrl}api/products`;

    // const fetchData = async () => {
    //   try {
    //     const res = await fetch(url);
    //     const result = await res.json();
    //     if (result) {
    //       setMenuData(result.data);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    
    useEffect(() => {
      // fetchData();
      setLoading(true);
      axios
        .get(url)
        .then((response) => {
          setMenu(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, []);

    const handleFilterChange = (key, value) => {
        setParams(prevParams => {
            if(value === null){
                prevParams.delete(key);
            }else{
                prevParams.set(key, value);
            }
            return prevParams;
        });

        if(value === null){
            setSubFoodParams(prevParams => {
                '';
            });
        }
    };

    const handleSubFilterChange = (key, value) => {
        setSubFoodParams(prevParams => {
            if(value === null){
                prevParams.delete(key);
            }else{
                prevParams.set(key, value);
            }
            return prevParams;
        });

    };


    const category = menu?.filter(menu => menu.mainCategory === foodType).flatMap(menu => menu.category);;
    const filteredCategory = category.reduce((values, item) => {
        if(!values.includes(item)){
            values.push(item);
        }
        return values;
    }, [`all ${foodType}`]);
    
    // console.log(filteredCategory);

    const categoryBtns = filteredCategory.map((category, index) => (
        <button 
            key={index}
            className=
            {
                `filter-btn 
                ${
                    category.includes('all') ? 
                    (subFoodType === null ? "selected" : "") : 
                    (subFoodType === category ? "selected" : "")
                }`
            } 
            type='button' 
            onClick={() => handleSubFilterChange("subtype", category.includes('all') ? null : category)}
            id={category}
        >
        {category}
        </button>  
    ));

    return (
        <>
            <div className='btn-container'>
            
                <button 
                    className={`filter-btn ${foodType === null ? "selected" : ""}`} 
                        type='button' 
                        onClick={() => handleFilterChange("type", null)}
                >       
                All Items
                </button>
                <button 
                    className={`filter-btn ${foodType === "food" ? "selected" : ""}`}
                    type='button' 
                    onClick={() => handleFilterChange("type", "food")}
                >
                Food
                </button>
                <button 
                    className={`filter-btn ${foodType === "drink" ? "selected" : ""}`}
                    type='button' 
                    onClick={() => handleFilterChange("type", "drink")}
                >
                Drink
                </button>
            </div>
              
            {/* {   
                foodType === "food" && 
                <div className='btn-container'> 
                    <button 
                        className={`filter-btn ${subFoodType === null ? "selected" : null}`} 
                        type='button' 
                        onClick={() => handleSubFilterChange("subtype", null)}
                    >
                    All Food
                    </button>
                    <button 
                        className={`filter-btn ${subFoodType === "rice" ? "selected" : ""}`}
                        type='button' 
                        onClick={() => handleSubFilterChange("subtype", "rice")}
                    >
                    Rice
                    </button>
                    <button 
                        className={`filter-btn ${subFoodType === "curry" ? "selected" : ""}`} 
                        type='button'
                        onClick={() => handleSubFilterChange("subtype", "curry")}
                    >
                    Curry
                    </button> 
                        
                </div>
            }
            {   
                foodType === "drink" && 
                <div className='btn-container'> 
                    <button 
                        className={`filter-btn ${subFoodType === null ? "selected" : null}`} 
                            type='button' 
                            onClick={() => handleSubFilterChange("subtype", null)}
                    >
                    All Drinks
                    </button>
                    <button 
                        className={`filter-btn ${subFoodType === "coffee" ? "selected" : ""}`}
                            type='button' 
                            onClick={() => handleSubFilterChange("subtype", "coffee")}
                    >
                    Coffee
                    </button>
                    <button 
                        className={`filter-btn ${subFoodType === "other" ? "selected" : ""}`} 
                            type='button'
                            onClick={() => handleSubFilterChange("subtype", "other")}
                    >
                    Other
                    </button> 
                        
                </div>
            } */}

            {
                foodType && 
                <div className='btn-container'> 
                    {categoryBtns}  
                </div>
            }
            
            <div className='section-center'>
                <DisplayMenu data={menu}/>
            </div>
            {loading && <h1 className='loading-text'>Loading....</h1>}
        </>
        
  )
}

export default Buttons