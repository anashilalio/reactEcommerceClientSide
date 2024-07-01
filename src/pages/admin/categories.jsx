import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TiDelete } from "react-icons/ti";
import { MdOutlineDoneOutline } from "react-icons/md";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [change, setChange] = useState(0);
  const [categorie, setCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(false);
  const [addCategorie, setAddCategorie] = useState(false);
  const [afficherMessage, setAfficherMessage] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      let response = await fetch("http://localhost/ecommerce%20project/admin/catg.php");
      let message = await response.json();
      setCategoriesList(message);
    }
    fetchCategories();
  }, [change, message]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const addCategories = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${year}/${month}/${day}`;
    await axios.post("http://localhost/ecommerce%20project/admin/addCategroie.php", { categorie, description, fullDate });
    setChange((change) => change + 1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCategories = categoriesList.filter((category) =>
    category.categorie.toLowerCase().includes(search.toLowerCase()) ||
    category.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'categorie', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'dat', headerName: 'Date', flex: 1 },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params) => (
        <FaTrashAlt onClick={() => setAfficherMessage(true)} className='text-red-500 cursor-pointer hover:opacity-60' />
      ),
      flex: 0.5,
    }
  ];

  return (
    <div className='pl-72 pr-12 pt-12 bg-gray-100 min-h-screen'>
      <div className="flex justify-end mb-4">
        <Button variant="contained" color="primary" onClick={() => setAddCategorie(true)} className='mr-28'>
        ajouter une catégorie        </Button>
      </div>
      <Box sx={{ height: 500, width: '100%', backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearch}
          sx={{ marginBottom: '16px' }}
        />
        <DataGrid
          rows={filteredCategories}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowId={(row) => row.categorie} // Ensure unique row id
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #e0e0e0',
            },
          }}
        />
      </Box>

      <Modal
        open={addCategorie}
        onClose={() => setAddCategorie(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
        }}>
          <div className='relative' onClick={() => setAddCategorie(false)}>
            <TiDelete className='absolute right-0 top-0 cursor-pointer text-black hover:opacity-60' />
          </div>
          <Typography id="modal-title" variant="h6" component="h2" className='text-center'>
          ajouter une catégorie          </Typography>
          <form className='flex flex-col items-center gap-4 mt-4'>
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              value={categorie}
              onChange={e => setCategorie(e.target.value)} 
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={() => { setAddCategorie(false); setMessage(true); addCategories(); }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      {message &&
        <div className='absolute top-4 right-12 py-4 px-4 bg-white shadow rounded-xl flex items-center gap-4'>
          Category has been added successfully. <MdOutlineDoneOutline className='text-green-500' />
        </div>
      }
      
      <Modal
        open={afficherMessage}
        onClose={() => setAfficherMessage(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
        }}>
          <div className='relative w-full' onClick={() => setAfficherMessage(false)}>
            <TiDelete className='absolute right-0 cursor-pointer hover:opacity-60' />
          </div>
          <Typography id="modal-title" variant="h6" component="h2" className='text-center'>
            Delete Category
          </Typography>
          <Typography id="modal-description" className='mt-4'>
            Please delete all the books in this category before deleting the category.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Categories;
