import React, { useState } from 'react'
import axios from 'axios';
export const AddProductForm = () => {
    const [name , setProductname] = useState("");
    const [description, setDescription] = useState('');
    const [price , setPrice ] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost/ecommerce%20project/admin/addProduct.php', { name, description, price });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">product Name</label>
            <input type="text" value={name} name='name' onChange={e => setProductname(e.target.value)} />
            <label htmlFor="">description</label>
            <input type="text" value={description} name='description' onChange={e => setDescription(e.target.value)} />
            <label htmlFor="">Price</label>
            <input type="text" name='price' value={price}  onChange={e => setPrice(e.target.value)}/>
            <input type="submit" value='add product'/>
        </form>
    </div>
  )
}
export default AddProductForm;