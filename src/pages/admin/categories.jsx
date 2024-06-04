import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { TiDelete } from "react-icons/ti";

const categories = () => {
    const  [categoriesList  ,setCategoriesList ] = useState([]);
    const [change , setChange ] = useState(0);
    const [addCategorie , setAddCategorie ] = useState(false);
    const [categorie , setCategorie] = useState('');
    const [description , setDescription ] = useState('');
    useEffect(()=>{
        const categorie =async()=>{
            let response = await fetch("http://localhost/ecommerce%20project/admin/categories.php");
            let message = await response.json();
            setCategoriesList(message)
        }
        categorie();
        

    },[change])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'categorie',
          headerName: 'name',
          width: 150,
          editable: true,
        },
        {
          field: 'NProducts',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'description',
          type: 'number',
          width: 150,
          editable: true,
        },
        {
            field: 'dat',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
          },{
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params) => {
              const onClick = async() => {
                const name = params.row.categorie;
                let response = await axios.post("http://localhost/ecommerce%20project/admin/deleteCategorie.php" ,{name}) ;
                console.log(response.data)
                setChange(change+1);
              };
        
              return <button onClick={onClick}><FaTrashAlt /></button>;
            },
          },
        
      ];
      
      
      const rows = categoriesList.map((e, index) => ({ ...e, id: index }));
      const addCategories=async (e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost/ecommerce%20project/admin/addCategroie.php" , {categorie}) ;
        console.log(response)
    }
  return (
    <div className='pl-96 pr-12 pt-12 bg-gray-50 h-screen'>
        <div className="w-full flex justify-end " onClick={()=>setAddCategorie(true)}><button className='px-6 bg-blue-500 text-white rounded-xl py-2 mb-4 mr-28 ' >Add</button></div>
        
        <Box sx={{ height: 400, width: '90%' }} className="shadow-lg">
      <DataGrid
        rows={rows}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        pageSizeOptions={[5]}
        
      />
    </Box>
        {addCategorie && <div className='fixed inset-0 bg-black opacity-50' style={{backdropFilter: 'blur(5px)'}}></div>}
        {addCategorie && 
        <div className=' px-16 py-4 rounded shadow absolute top-1/4 left-3/5 ml-40 bg-white'>
          <div className='relative' onClick={()=>setAddCategorie(false)}><TiDelete className='absolute left-72 size-6' /></div>
          <div className='text-xl text-center'>Add Categorie</div>
          <form onSubmit={addCategories} className='flex flex-col items-center gap-4'>
            <input type="addCategorie"  placeholder='add' name='categorie' 
            className='text-black w-72 outline-none border-b-2 h-12' value={categorie} onChange={e=>setCategorie(e.target.value)}  />
            <textarea type="description" placeholder='description' name='description'
             className='text-black w-72 outline-none border-b-2 ' value={description} onChange={e=>setDescription(e.target.value)}  />
            <input type="submit" className='w-72 bg-blue-600 text-white cursor-pointer rounded-xl h-12 hover:opacity-80' />
        </form>
          </div>}
        
    </div>
  )
}

export default categories