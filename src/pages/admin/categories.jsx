import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { TiDelete } from "react-icons/ti";
import { MdOutlineDoneOutline } from "react-icons/md";

const categories = () => {
    const  [categoriesList  ,setCategoriesList ] = useState([]);
    const [change , setChange ] = useState(0);
    const [categorie , setCategorie] = useState('');
    const [description , setDescription ] = useState('');
    const [message , setMessage ] = useState(false);
    const [addCategorie , setAddCategorie ] = useState(false);
  const [afficherMessage, setAfficherMessage ] = useState(false)
    useEffect(()=>{
        const categories =async()=>{
            let response = await fetch("http://localhost/ecommerce%20project/admin/catg.php");
            let message = await response.json();
            setCategoriesList(message)
        }
        categories();
        

    },[change , message])
    useEffect(()=>{
      if(message){
        const timer = setTimeout(()=>{
          setMessage(false);
        },3000)
        return () => clearTimeout(timer); 
      }
      
    },[message])
    const addCategories=async ()=>{
      const date = new Date();
      const day = date.getDay();
      const month = date.getMonth()+1 ; 
      const year = date.getFullYear();
      const fullDate= `${year}/${month}/${day}}`
      let response = await axios.post("http://localhost/ecommerce%20project/admin/addCategroie.php" , {categorie , description , fullDate });
           console.log(response)
            
    }
      
    

      
  return (
    <div className='pl-72 pr-12 pt-12 bg-gray-50 h-screen relative'>
        <div className="w-full flex justify-end " onClick={()=>setAddCategorie(true)}><button className='px-6 bg-green-500 text-white rounded-xl py-2 mb-4 mr-28 ' >Add</button></div>
        <div className='grid grid-cols-4  border-b-2 w-full pl-12 text-white text-xl font-bold h-20 cursor-pointer rounded-2xl shadow mb-4  bg-green-500 '>
            <div className='flex items-center justify-center'>name</div>
            <div className='flex items-center justify-center'>description</div>
            <div className='flex items-center justify-center'>date</div>
            <div className='flex items-center justify-center'>delete</div>
            

        </div>
        {categoriesList.map((e)=>{
          return <div className='grid grid-cols-4  border-b-2 w-full pl-12 h-28 cursor-pointer rounded-2xl shadow mb-4 hover:bg-gray-200'>
          <div className='flex items-center justify-center'>{e.categorie}</div>
          <div className='h-12 overflow-hidden flex items-center mt-6 justify-center'>{e.description}</div>
          <div className='flex items-center justify-center'>{e.dat}</div>
          <div className='flex items-center justify-center'><FaTrashAlt onClick={()=>setAfficherMessage(true)} className='text-red-500 size-6 hover:opacity-60'/></div>

          </div>
        })}

        {addCategorie && <div className='fixed inset-0 bg-black opacity-50' style={{backdropFilter: 'blur(5px)'}}></div>}
        {addCategorie && 
        <div className=' px-16 py-4 rounded shadow absolute top-1/4 left-3/5 ml-40 bg-white'>
          <div className='relative' onClick={()=>setAddCategorie(false)}><TiDelete className='absolute left-72 size-6' /></div>
          <div className='text-xl text-center'>Add Categorie</div>
          <form  className='flex flex-col items-center gap-4'>
            <input type="addCategorie"  placeholder='add' name='categorie' 
            className='text-black w-72 outline-none border-b-2 h-12' value={categorie} onChange={e=>setCategorie(e.target.value)}  />
            <textarea type="description" placeholder='description' name='description'
             className='text-black w-72 outline-none border-b-2 ' value={description} onChange={e=>setDescription(e.target.value)}  />
            <input type="submit" className='w-72 bg-green-600 text-white cursor-pointer rounded-xl h-12 hover:opacity-80' onClick={()=>{setAddCategorie(false) ; setMessage(true) ; addCategories()}}  />
        </form>
          </div>}
          {message &&
          <div className='absolute px-4 top-4 right-12 py-4 bg-white shadow rounded-xl flex items-center gap-4 '>

          La categorie a été ajouté avec succès. <MdOutlineDoneOutline className='text-green-500 size-8'/>
          </div>
          }
                 {afficherMessage && <div className='fixed inset-0 bg-black opacity-50' style={{backdropFilter: 'blur(5px)'}}></div>}
          {afficherMessage && 
          <div className='absolute px-4 top-64 right-96 py-4 h-28 text-black bg-white shadow rounded-xl gap-4 '>
          <div className='relative w-full' onClick={()=>setAfficherMessage(false)}><TiDelete className='absolute right-0   size-6 text-black cursor-pointer hover:opacity-60' /></div>
            <div className='pt-8  font-semibold'>          veuillez supprimer tous les livres de cette catégorie avant de supprimer 
            </div>
          </div>}
          
          
        
    </div>
  )
}

export default categories