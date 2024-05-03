import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const AddProductForm = () => {
    const [name , setProductname] = useState("");
    const [description, setDescription] = useState('');
    const [price , setPrice ] = useState("");
    const [categories , setCategories ] = useState([]);
    const [categorie , setCategorie ] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost/ecommerce%20project/admin/addProduct.php', { name, description, price , categorie });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(()=>{
        const getCategories = async()=>{
          const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
          const json = await response.json();
          console.log(json)
          setCategories(json)
        }
        getCategories()
      },[])
      
      const handleSelect = (e)=>{
        setCategorie(e.target.value)
        console.log("categorie" , categorie)
      }
  return (
    <div className='mt-16 text-black'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">product Name</label>
            <input type="text" value={name} name='name' onChange={e => setProductname(e.target.value)} />
            <label htmlFor="">description</label>
            <input type="text" value={description} name='description' onChange={e => setDescription(e.target.value)} />
            <label htmlFor="">Price</label>
            <input type="number" name='price' value={price}  onChange={e => setPrice(e.target.value)}/>
            <label htmlFor="">categorie</label>
            <select name="" id="" onChange={handleSelect}>
             {categories.map((categorie)=>{
              return<>
                <option value={categorie.categorie}>{categorie.categorie}</option>
              </>
             })}

            </select>
            <input type="submit" className='text-white' value='add product'/>
            
        </form>
    </div>
  )
}
export default AddProductForm;