import React, { useState } from 'react'
import axios from 'axios';
const AddCategorie = () => {
    const [categorie , setCategorie] = useState('');
    const [description , setDescription ] = useState('');
    const addCategorie=async (e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost/ecommerce%20project/admin/addCategroie.php" , {categorie}) ;
        console.log(response)
    }
  return (
    <div className='mt-44  ml-72'>
      <div className='text-center text-5xl mb-8 font-bold mr-24'>categorie</div>
        <form onSubmit={addCategorie} className='flex flex-col mr-20 items-center gap-4'>
            <input type="addCategorie"  placeholder='add' name='categorie' 
            className='text-black w-72 outline-none border-b-2 h-12' value={categorie} onChange={e=>setCategorie(e.target.value)}  />
            <textarea type="description" placeholder='description' name='description'
             className='text-black w-72 outline-none border-b-2 ' value={description} onChange={e=>setDescription(e.target.value)}  />
            <input type="submit" className='w-72 bg-blue-600 text-white cursor-pointer rounded-xl h-12 hover:opacity-80' />
        </form>
    </div>
  )
}

export default AddCategorie