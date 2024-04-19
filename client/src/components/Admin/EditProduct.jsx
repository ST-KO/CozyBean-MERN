import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import {useSnackbar} from 'notistack';
import axios from 'axios';
import './styles.css';

const EditProduct = () => {

    const [menuData, setMenuData] = useState({
        englishName: "",
        myanmarName: "",
        mainCategory: "",
        subCategory1: "",
        subCategory2: "",
        subCategory3: "",
        price: "",
        file: ""
    });


    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const {id} = useParams();


    const settingData = (data) => {

        setMenuData(prevState => (
            {
                englishName: data.englishName,
                myanmarName: data.myanmarName,
                mainCategory: data.mainCategory,
                subCategory1: data.subCategory1,
                subCategory2: data.subCategory2,
                subCategory3: data.subCategory3,
                price: data.price,
                file: data.img
            }
        ))
    }; 

    const backendUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5555';
    useEffect(() => {
        axios.get(`${backendUrl}api/products/${id}`)
        .then(res => {
            settingData(res.data);

        })
        .catch(err => {
            console.log(err);
            
        })
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('englishName', menuData.englishName);
        formData.append('myanmarName', menuData.myanmarName);
        formData.append('mainCategory', menuData.mainCategory);
        formData.append('subCategory1', menuData.subCategory1);
        formData.append('subCategory2', menuData.subCategory2);
        formData.append('subCategory3', menuData.subCategory3);
        formData.append('price', menuData.price);
        formData.append('file', menuData.file);
        
        axios.put(`${backendUrl}api/products/${id}`, formData)
            .then(res => {
                enqueueSnackbar("Menu Edited Successfully", {variant: "success"});
                navigate(`/createitem/${res.data._id}`);
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Please Provide Required Info", {variant: "error"});
            })
    };

    const handleChange = (e) => {

        if(e.target.name === 'file'){
            const reader = new FileReader();
            const file = e.target.files && e.target.files[0];

            reader.onloadend = () => {
                setMenuData(prevState => ({
                    ...prevState,
                    file,
                    filePreview: reader.result
                }))
            };

            if(file){
                reader.readAsDataURL(file);
            }
        }else{
            setMenuData(prevState => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value,
                }
            })
        }

        // setMenuData(prevState => {
        //     return {
        //         ...prevState,
        //         [e.target.name]: e.target.value,
        //         file: e.target.files && e.target.files[0]
        //     }
        // });
    }

    return (
    <div className='menu'>
        <div className='title'>
            <h2>Editing Menu</h2>
            <div className='underline'></div>
        </div>
        <Link to={`/`} className='login_back_icons'>
                <BsArrowLeft/>
                <h6>Back to Menu Page</h6>
        </Link>
        <div className='create_products_section'>
        <div className='create_products_input'>
            <label htmlFor="englishName">English Name (Required)</label>
            <input 
                type="text" 
                id="englishName"
                name="englishName"
                value={menuData.englishName}
                onChange={handleChange}
            />
        </div>
        <div className='create_products_input'>
            <label htmlFor="myanmarName">Myanmar Name (Required)</label>
            <input 
                type="text" 
                id="myanmarName"
                name="myanmarName"
                value={menuData.myanmarName}
                onChange={handleChange}
            />
        </div>
        <div className='create_products_input'>
            <label htmlFor="mainCategory">Main Category (Required)</label>
            <input 
                type="text" 
                id="mainCategory"
                name="mainCategory"
                value={menuData.mainCategory}
                onChange={handleChange}
            />
            <span>(food or drink)</span>
        </div>
        <div className='create_products_input'>
            <label htmlFor="subCategory1">Sub Category 1 (Required)</label>
            <input 
                type="text" 
                id="subCategory1"
                name="subCategory1"
                value={menuData.subCategory1}
                onChange={handleChange}
            />
            <span>(curry, noodle, rice etc..)</span>
        </div>
        <div className='create_products_input'>
            <label htmlFor="subCategory2">Sub Category 2 (Optional)</label>
            <input 
                type="text" 
                id="subCategory2"
                name="subCategory2"
                value={menuData.subCategory2}
                onChange={handleChange}
            />
            <span>(curry, noodle, rice etc..)</span>
        </div>
        <div className='create_products_input'>
            <label htmlFor="subCategory3">Sub Category 3 (Optional)</label>
            <input 
                type="text" 
                id="subCategory3"
                name="subCategory3"
                value={menuData.subCategory3}
                onChange={handleChange}
            />
            <span>(curry, noodle, rice etc..)</span>
        </div>
        <div className='create_products_input'>
            <label htmlFor="price">Price (Required)</label>
            <input 
                type="text" 
                id="price"
                name="price"
                value={menuData.price}
                onChange={handleChange}
            />
            <span>(e.g. 10,000)</span>
        </div>
        <div className='create_products_input'>
            <label htmlFor="image">Photo (Optional)</label>
            {
                menuData.filePreview ? 
                <img src={menuData.filePreview} alt="menu item" className='createproduct-photo' /> :
                <img src={`${backendUrl}images/${menuData?.file}`} alt="menu item" className='createproduct-photo' /> 
                
            }
            <input 
                type='file' 
                id="image" 
                name="file"
                onChange={handleChange} />
        </div>
        <button onClick={handleUpload} className='button'>Save</button>
    </div>
    </div>

  )
}

export default EditProduct