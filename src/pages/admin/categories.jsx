import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const categories = () => {
    const  [categoriesList  ,setCategoriesList ] = useState([]);
    const [change , setChange ] = useState(0);
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
      console.log(categoriesList)
  return (
    <div className='pl-96 pr-12 pt-12 bg-gray-50 h-screen'>
        <div className="w-full flex justify-end "><button className='px-6 bg-blue-500 text-white rounded-xl py-2 mb-4 mr-28 ' >Add</button></div>
        
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
        
        
        
    </div>
  )
}

export default categories