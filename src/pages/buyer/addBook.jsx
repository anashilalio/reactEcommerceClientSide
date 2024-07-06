import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { IoImagesSharp } from "react-icons/io5";
import { FaFileMedical } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { contextProviderInfo } from '../../context/ContextProvider';
import { MdOutlineDoneOutline } from "react-icons/md";

export const addBook = () => {
    const [name, setProductname] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [categorie, setCategorie] = useState("");
    const [image, setImage] = useState("");
    const [autheur, setAutheur] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [bookDate, setBookDate] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [bookLink, setBookLink] = useState();
    const [imageBeinghover, setImageBeingHover] = useState(false);
    const [file, setFile] = useState(null);
    const {clientdata } = useContext(contextProviderInfo)
    const [success , setSuccess ] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('categorie', categorie);
        formData.append('image', image);
        formData.append('autheur', autheur);
        formData.append('date', bookDate);
        formData.append('createdDate', createdDate);
        formData.append('bookLink', bookLink);
        formData.append('file', file);
        formData.append('clientid', clientdata);


        try {
            const response = await axios.post('http://localhost/ecommerce%20project/admin/addBook.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess(true)
            setInterval(()=>{
                setSuccess(false)
            },2000)
            
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        setDescription("");
        setImage(null);
        setPreviewImage(null);
        setProductname("");
        setPrice("");
        setBookLink("");
    };

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
            const json = await response.json();
            setCategories(json);
        };

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
        const day = currentDate.getDate();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        setCreatedDate(`${year}-${month}-${day} ${hour}:${minute}:${seconds}`);

        getCategories();
    }, [bookDate]);

    const handleSelect = (e) => {
        setCategorie(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const inputStyle = 'w-full h-10 outline-none border-b-2 rounded-md px-4 py-2 focus:border-indigo-500';

    return (
        <div className='  bg-gray-200 py-12'>
            <form onSubmit={handleSubmit} className='flex items-center flex-wrap pl-32 pt-12  mx-48'>

                <label htmlFor="ProductUp" className='relative border w-44 rounded-xl shadow-lg bg-white h-56 mr-8 cursor-pointer overflow-hidden hover:text-white hover:bg-black hover:bg-opacity-25'>
                    {imageBeinghover && <div className={`absolute top-16 left-10 text-xl text-black z-10`} onMouseEnter={() => setImageBeingHover(true)}><IoImagesSharp className='size-24' /></div>}
                    {previewImage ? <img src={previewImage} className={`w-full h-full object-cover ${imageBeinghover && 'opacity-50'}`} onMouseEnter={() => setImageBeingHover(true)} onMouseLeave={() => setImageBeingHover(false)} alt="preview" /> : <IoImagesSharp className='size-24 mx-auto mt-14' />}
                </label>
                <input type="file" id='ProductUp' name='image' onChange={handleImageChange} accept="image/*" className='hidden' />
                
                <label htmlFor="files" className='relative border w-44 rounded-xl shadow-lg bg-white h-56 mr-8 cursor-pointer overflow-hidden hover:text-white hover:bg-black hover:bg-opacity-25 flex justify-center items-center'>
                    <FaFileMedical className='size-20' />
                </label>

                <input type="file" name='link' id="files" onChange={handleFile} className='hidden' />

                <div className='flex flex-wrap mt-8 w-full gap-8'>
                    <input type="text" value={name} name='name' onChange={e => setProductname(e.target.value)} className={`${inputStyle}`} placeholder='Title' />
                    <input type="text" name='autheur' value={autheur} onChange={e => setAutheur(e.target.value)} className={inputStyle} placeholder='Author' />
                    <input type="number" name='price' value={price} onChange={e => setPrice(e.target.value)} className={inputStyle} placeholder='Price' />
                    <select name="categorie" onChange={handleSelect} className={inputStyle}>
                        <option value="" disabled>Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.categorie}>{cat.categorie}</option>
                        ))}
                    </select>
                    <input type="date" name='date' value={bookDate} onChange={e => setBookDate(e.target.value)} className={inputStyle} />

                    <ReactQuill value={description} onChange={setDescription} className='w-full h-40 bg-white  border-2  rounded-xl focus:border-indigo-500' placeholder='Description' />

                    <input type="submit" value='Add Product' className="bg-green-600 mt-6 w-72 h-12 rounded-lg text-white cursor-pointer hover:opacity-80" />
                </div>
            </form>
            
            {success &&
            
            (
                <div className='fixed top-10 z-20 right-4 w-72 h-24 bg-white flex items-center gap-4 px-12 rounded-2xl text-4xl'>
                    <MdOutlineDoneOutline className='text-green-500 size-12'/>
                    Success
                </div>
            )}
                
           
        </div>
    );
};

export default addBook;
