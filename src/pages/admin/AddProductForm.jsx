import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { IoImagesSharp } from "react-icons/io5";
import { FaFileMedical } from "react-icons/fa6";

export const AddProductForm = () => {
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
        setBookLink("");
      };
      useEffect(()=>{
        const getCategories = async()=>{
          const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
          const json = await response.json();
          console.log(json)
          setCategories(json)
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
        const day = currentDate.getDate();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        setCreatedDate(`${year}-${month}-${day} ${hour}:${minute}:${seconds}`);

        getCategories()
        console.log(bookDate)
        
      },[bookDate])
      
      const handleSelect = (e)=>{
        setCategorie(e.target.value)
        console.log("categorie" , categorie)
      }
      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        console.log(previewImage)
    }
    const handleFile = (e)=>{
      setFile(e.target.files[0])
      console.log(e.target.files[0])
    }
    
    const inputStyle = ()=>{
     return 'w-130 h-10 outline-none border-b-2 rounded-xl px-4 py-2'
    }
    

  return (
    <div className='ml-48 mb-12'>
        <form onSubmit={handleSubmit} className='flex  items-center  flex-wrap  pl-32 pt-12 bg-gray-50'>

          {/* <label htmlFor="">image</label> */}
          
          <label htmlFor="ProductUp" className='relative border w-44 rounded-xl shadow-lg bg-white h-56  mr-8 cursor-pointer overflow-hidden hover:text-white hover:bg-black hover:bg-opacity-25'>
            {imageBeinghover && <div className={`absolute top-16 left-10 text-xl text-black z-10`} onMouseEnter={()=>setImageBeingHover(true)}><IoImagesSharp className='size-24'/></div>}
            {previewImage ? <img src={previewImage}  className={`size-full ${imageBeinghover && 'opacity-50'}`} onMouseEnter={()=>setImageBeingHover(true)} onMouseLeave={()=>setImageBeingHover(false)}/>:<IoImagesSharp className='size-24 mx-auto mt-14'/>}
            </label>
          <input type="file" id='ProductUp' name='image' onChange={handleImageChange} accept="image/*" className='hidden' />
          <label htmlFor="files"  className=' relative border w-44 rounded-xl shadow-lg  bg-white h-56  mr-8 
          cursor-pointer overflow-hidden hover:text-white hover:bg-black hover:bg-opacity-25 px-10 py-20'>
         <div >
           <FaFileMedical className='size-20'/>
          </div>
            </label>
          
          
          <div className='flex  flex-wrap mt-8 w-full gap-8'>

          <input type="text" value={name} name='name' onChange={e => setProductname(e.target.value)} className={`${inputStyle()}`} placeholder='title'/>

            {/* <label htmlFor="">description</label> */}
            <input type="text" name='autheur' value={autheur}  onChange={e => setAutheur(e.target.value)} className={inputStyle()} placeholder='auteur'/>
            <input type="number" name='price' value={price}  onChange={e => setPrice(e.target.value)} className={inputStyle()} placeholder='price'/>
            <select name="" id="" onChange={handleSelect} className={inputStyle()}>
             {categories.map((categorie)=>{
              return<>
                <option value={categorie.categorie}>{categorie.categorie}</option>
              </>
             })}

            </select>
            
            <input type="date" name='date' value={bookDate}  onChange={e => setBookDate(e.target.value)} className={inputStyle()}/>
     
<input type="file" name='link' id="files" value={bookLink} onChange={handleFile} className={`${inputStyle()} hidden`} placeholder='Link'/>

            
            <textarea type="text" value={description} name='description' onChange={e => setDescription(e.target.value)} className={`h-20 ${inputStyle()} w-full mr-10`} placeholder='description' />
            {/* <label htmlFor="">Price</label> */}
            
            {/* <label htmlFor="">categorie</label> */}
            
          </div>
            {/* <label htmlFor="">product Name</label> */}
           
            <input type="submit"  value='add product' className="bg-green-600  w-72 h-12 rounded-lg text-white cursor-pointer hover:opacity-80 "/>
            
        </form>
        

    </div>
  )
}
export default AddProductForm;