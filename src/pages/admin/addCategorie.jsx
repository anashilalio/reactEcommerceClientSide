import React, { useState } from 'react'
import axios from 'axios';
const AddCategorie = () => {
    const [categorie , setCategorie] = useState('');

    const addCategorie=async (e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost/ecommerce%20project/admin/addCategroie.php" , {categorie}) ;
        console.log(response)
    }
  return (
    <div className='mt-16  ml-72'>
        <form onSubmit={addCategorie}>
            <input type="addCategorie" placeholder='add' name='categorie' className='text-black' value={categorie} onChange={e=>setCategorie(e.target.value)}  />
            <input type="submit" />
        </form>
    </div>
  )
}

export default AddCategorie