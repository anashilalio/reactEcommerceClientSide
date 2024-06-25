import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';

const Books = () => {
    const [books , setBooks ] = useState([]);
    const [modify , setModify] = useState(false);
    const [name , setProductname] = useState("");
    const [description, setDescription] = useState('');
    const [price , setPrice ] = useState("");
    const [categories , setCategories ] = useState([]);
    const [categorie , setCategorie ] = useState("");
    const [image , setImage ] = useState("");
    const [autheur , setAutheur ] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [bookDate , setBookDate ] = useState();
    const [createdDate , setCreatedDate ] = useState();
    const [bookLink , setBookLink ] = useState();
    const [imageBeinghover , setImageBeingHover] =useState(false); 
    const [file , setFile ] = useState(false)
    const [deletes , setDeletes  ] = useState(false);
    const [deletebook ,setDeletebook ] = useState("");
    useEffect(()=>{
        const listOfBooks = async ()=>{
            const response = await fetch("http://localhost/ecommerce%20project/client/product.php");
            const jsonn = await response.json();
            console.log(jsonn)
            setBooks(jsonn);
        }
        const getCategories = async()=>{
            const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
            const json = await response.json();
            console.log(json)
            setCategories(json)
          }
          getCategories();
        listOfBooks();
    },[deletebook , modify])
    const modifyBook=async()=>{
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

        const response = await axios.post('http://localhost/ecommerce%20project/admin/addProduct.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
    console.log(response)
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    const handleFile = (e)=>{
        setFile(e.target.files[0])
      }
      const handleSelect = (e)=>{
        setCategorie(e.target.value)
        console.log("categorie" , categorie)
      }
      const delet=async()=>{
        const response = axios.post("http://localhost/ecommerce%20project/admin/deleteBook.php" , {deletebook}) 
        console.log(response)
        setDeletebook("")
      }
  return (
    <div className='pl-72  bg-gray-100'
    >
        <div className='text-center text-6xl py-8'>Books</div>
    <div className=' pr-12 pb-12  overflow-hidden'>
    <div className='grid grid-cols-6 w-full border-b-2 h-20 align-center pl-12 text-2xl font-mono text-white bg-green-600 mb-4 rounded-2xl shadow'>
                <div className='flex items-center'>image</div>
                <div className='flex items-center'>title</div>
                <div className='flex items-center'>category</div>
                <div className='flex items-center'>autheur</div>
                <div className='flex items-center'>date</div>
                <div className='flex items-center'>Modify</div>


            </div>
        {books.map((book)=>{
            return<>
            <div className='grid grid-cols-6 w-full border-b-2 w-full pl-12 h-28 cursor-pointer rounded-2xl shadow mb-4 hover:bg-gray-200'>
            <div  className='flex items-center'><img src={`http://localhost/ecommerce%20project/admin/${book.images}`} className='h-20 w-16' alt="" /></div>            
            <div className='flex items-center'>{book.name}</div>
            <div className='flex items-center'>{book.categorie}</div>
            <div className='flex items-center'>{book.autheur}</div>
            <div className='flex items-center'>{book.dat}</div>
            <div className='flex items-center gap-4'>
                <PiNotePencilBold className='hover:text-blue-500' onClick={()=>setModify(true)}/>
             <FaTrashAlt className='hover:text-blue-500' onClick={()=>{setDeletebook(book.name) ; setDeletes(true)}}/> </div>

            </div>
            </>
        })}
         {deletes && <div className='fixed inset-0 bg-black opacity-50' style={{backdropFilter: 'blur(5px)'}}></div>}

        {deletes && 
        <div className='bg-white fixed top-72 h-28 px-12 py-8 ml-72 rounded-xl shadow-xl'>
                <div className='relative w-full'>
            <TiDelete className='absolute -right-10 -top-8 size-8 cursor-pointer' onClick={()=>setDeletes(false) }/>
            </div>
                <div>voulez-vous supprimer ce livre</div>
                <button className='text-white bg-red-400  px-4 rounded-xl text-center ml-12 mt-4 ' onClick={()=>{delet() ;setDeletes(false)}}>supprimer</button>
        </div>
        }
        {modify && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl p-12'>
            <div className='relative w-full'>
            <TiDelete className='absolute -right-10 -top-12 size-12 cursor-pointer' onClick={()=>setModify(false)}/>
            </div>
            <div className='text-2xl text-center'>Modify</div>
            <div className='grid grid-cols-2 gap-4'>
                <input type="text" className='border-2 border-gray-300 rounded-2xl p-2' placeholder='title' onChange={e => setProductname(e.target.value)} value={name}/>
                <select name="" id="" onChange={handleSelect} >
             {categories.map((categorie)=>{
              return<>
                <option value={categorie.categorie}>{categorie.categorie}</option>
              </>
             })}

            </select>                <input type="text" className='border-2 border-gray-300 rounded-2xl p-2' placeholder='description' onChange={e => setDescription(e.target.value)} value={description}/>
            <input type="text" className='border-2 border-gray-300 rounded-2xl p-2' placeholder='Price' onChange={e => setPrice(e.target.value)} value={price}/>

                <input type="text" className='border-2 border-gray-300 rounded-2xl p-2' placeholder='autheur' onChange={e => setAutheur(e.target.value)} value={autheur}/>
                <input type="date" className='border-2 border-gray-300 rounded-2xl p-2' placeholder='date' onChange={e => setBookDate(e.target.value)} value={bookDate}/>
                <input type="file" id='ProductUp' name='image' onChange={handleImageChange} accept="image/*" className='' />
                <input type="file" name='link' id="files" value={bookLink} onChange={handleFile} placeholder='Link'/>

                <button className='bg-green-500 text-white rounded-2xl p-2' onClick={()=>{modifyBook(); setModify(false)}}>Modify</button>
            </div>
           
            
        </div>}
    </div>
         
    
    
    </div>
  )
}

export default Books