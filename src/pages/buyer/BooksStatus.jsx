import React, { useContext, useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';
import { contextProviderInfo } from '../../context/ContextProvider';

const BooksStatus = () => {
    const [books, setBooks] = useState([]);
    const [modify, setModify] = useState(false);
    const [name, setProductname] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [categorie, setCategorie] = useState("");
    const [image, setImage] = useState("");
    const [autheur, setAutheur] = useState("");
    const [bookDate, setBookDate] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [bookLink, setBookLink] = useState("");
    const [file, setFile] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [deletebook, setDeletebook] = useState("");
    const [search, setSearch] = useState("");
    const {clientdata } = useContext(contextProviderInfo)
    useEffect(() => {
        const listOfBooks = async () => {
            const clientid = parseInt(clientdata)
            const response = await axios.post("http://localhost/ecommerce%20project/admin/buyer/status.php" , {clientid});
            setBooks(response.data);
        };
        const getCategories = async () => {
            const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
            const json = await response.json();
            setCategories(json);
        };
        listOfBooks();
        getCategories();
    }, [deletebook, modify]);
    


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSelect = (e) => {
        setCategorie(e.target.value);
    };
    const delet = async () => {
        const response = await axios.post("http://localhost/ecommerce%20project/admin/deleteBook.php", { deletebook });
        console.log(response);
        setDeletebook("");
    };

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.categorie.toLowerCase().includes(search.toLowerCase()) ||
        book.autheur.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='px-44 pr-8 pt-12 bg-gray-100 min-h-screen'>
            <div className='text-center text-4xl font-bold py-8'>Livres</div>
            <div className='flex justify-end mb-6'>
                <input
                    type="text"
                    placeholder="Search books..."
                    className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:border-indigo-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='overflow-hidden '>
                <div className='grid grid-cols-7 gap-4 p-4 bg-gray-200 rounded-lg text-lg font-semibold text-gray-700 shadow-md'>
                    <div>Image</div>
                    <div>Titre</div>
                    <div>Catégorie</div>
                    <div>Aut</div>
                    <div>Date</div>
                    <div className='text-center'>Supprimer</div>
                    <div className='text-center'>Status</div>

                </div>
                {filteredBooks.map((book) => (
                    <div key={book.name} className='grid grid-cols-7 gap-4 p-4 bg-white rounded-lg shadow-md mt-4 hover:bg-gray-50'>
                        <div>
                            <img src={`http://localhost/ecommerce%20project/admin/${book.images}`} className='h-16 w-12 object-cover rounded-lg' alt={book.name} />
                        </div>
                        <div className='flex items-center'>{book.name}</div>
                        <div className='flex items-center'>{book.categorie}</div>
                        <div className='flex items-center'>{book.autheur}</div>
                        <div className='flex items-center'>{book.dat}</div>{console.log(book.images)} 
                        <div className='flex items-center justify-center gap-4'>
                            <FaTrashAlt className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => { setDeletebook(book.productid); setDeletes(true); }} />
                        </div>
                        <div className='flex items-center justify-center gap-4 text-white w-24 h-12 mt-2 rounded-xl  mx-auto' >
                            {book.approved === 'yes' ? (
                                <div className='text-green-600'>approuvé</div>
                            )    : (
                                <>
                                <div className='text-red-600'>En attent</div>
                                </>
                            )
                        }
                        </div>
                    </div>
                ))}
            </div>

            {deletes && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-8 rounded-lg shadow-lg relative'>
                        <TiDelete className='absolute top-2 right-2 text-2xl cursor-pointer text-gray-500 hover:text-gray-700' onClick={() => setDeletes(false)} />
                        <div className='text-center text-lg mb-4'>Do you want to delete this book?</div>
                        <div className='flex justify-center gap-4'>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={() => { delet(); setDeletes(false); }}>Delete</button>
                            <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg' onClick={() => setDeletes(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {modify && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-8 rounded-lg shadow-lg w-1/3 relative'>
                        <TiDelete className='absolute top-2 right-2 text-2xl cursor-pointer text-gray-500 hover:text-gray-700' onClick={() => setModify(false)} />
                        <div className='text-center text-2xl mb-4'>Modify Book</div>
                        <div className='grid grid-cols-2 gap-4'>
                            <input type="text" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' placeholder='Title' onChange={e => setProductname(e.target.value)} value={name} />
                            <select name="categorie" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' onChange={handleSelect} value={categorie}>
                                <option value="" disabled>Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.categorie} value={cat.categorie}>{cat.categorie}</option>
                                ))}
                            </select>
                            <input type="text" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' placeholder='Description' onChange={e => setDescription(e.target.value)} value={description} />
                            <input type="text" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' placeholder='Price' onChange={e => setPrice(e.target.value)} value={price} />
                            <input type="text" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' placeholder='Author' onChange={e => setAutheur(e.target.value)} value={autheur} />
                            <input type="date" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' placeholder='Date' onChange={e => setBookDate(e.target.value)} value={bookDate} />
                            <input type="file" id='ProductUp' name='image' onChange={handleImageChange} accept="image/*" className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' />
                            <input type="file" name='link' id="files" onChange={handleFile} className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500' placeholder='Link' />
                            <button className='col-span-2 bg-green-500 text-white rounded-lg p-2 mt-4' onClick={() => { modifyBook(); setModify(false); }}>Modify</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BooksStatus;
