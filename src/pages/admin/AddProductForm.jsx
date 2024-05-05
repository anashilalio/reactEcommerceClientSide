import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const AddProductForm = () => {
    const [name , setProductname] = useState("");
    const [description, setDescription] = useState('');
    const [price , setPrice ] = useState("");
    const [categories , setCategories ] = useState([]);
    const [categorie , setCategorie ] = useState("");
    const [image , setImage ] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('categorie', categorie);
        formData.append('image', image);
        try {
          const response = await axios.post('http://localhost/ecommerce%20project/admin/addProduct.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        setDescription("");
        setImage(null)
        setPreviewImage(null)
        setProductname("")
        setPrice(0)
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
      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        console.log(previewImage)
    }
    const inputStyle = ()=>{
     return 'w-72 h-10 outline-none border-b-2'
    }

  return (
    <div className='ml-48 '>
        <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-6'>
          {/* <label htmlFor="">image</label> */}
          
          <input type="file" name='image' onChange={handleImageChange} accept="image/*" className=' p-2 mt-2 file:rounded-xl file:bg-black file:text-white
          file:border-none file:px-4 file:py-2 file:cursor-pointer hover:file:shadow-xl hover:file:scale-105 ' />
          {previewImage && <img src={previewImage}  className='size-44'/>}
            {/* <label htmlFor="">product Name</label> */}
            <input type="text" value={name} name='name' onChange={e => setProductname(e.target.value)} className={inputStyle()} placeholder='title'/>
            {/* <label htmlFor="">description</label> */}
            <input type="text" value={description} name='description' onChange={e => setDescription(e.target.value)} className={inputStyle()} placeholder='description' />
            {/* <label htmlFor="">Price</label> */}
            <input type="number" name='price' value={price}  onChange={e => setPrice(e.target.value)} className={inputStyle()} placeholder='price'/>
            {/* <label htmlFor="">categorie</label> */}
            <select name="" id="" onChange={handleSelect} className={inputStyle()}>
             {categories.map((categorie)=>{
              return<>
                <option value={categorie.categorie}>{categorie.categorie}</option>
              </>
             })}

            </select>
            <input type="submit"  value='add product' className="bg-black w-72 h-12 rounded-lg text-white cursor-pointer hover:opacity-80 "/>
            
        </form>
        

    </div>
  )
}
export default AddProductForm;