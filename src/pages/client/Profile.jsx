import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { contextProviderInfo } from '../../context/ContextProvider';
import { Link, Navigate } from 'react-router-dom';
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const { setResult, search, setSearch, login, setLogin, clientdata , userRole  , setUserRole } = useContext(contextProviderInfo);
    const [state, setState] = useState('info');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [wishlist , setWishlist ]  = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const getUserInfo = async () => {
            const clientid = parseInt(clientdata);
            const response = await axios.post("http://localhost/ecommerce%20project/client/userInfo.php", { clientid });
            console.log(response.data);
            setUserInfo(response.data);
            setFormData(response.data[0]);
        };
        const getWishList = async () => {
            const clientid = parseInt(clientdata);
            const response = await axios.post("http://localhost/ecommerce%20project/client/getWishlist.php", { clientid });
            setWishlist(response.data);
            console.log(response.data)
        };
        getUserInfo();
        getWishList()
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = async () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (selectedFile) {
            formDataToSend.append('photo', selectedFile);
        }

        try {
            const response = await axios.post("http://localhost/ecommerce%20project/client/updateUser.php", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status === 'success') {
                alert('User information updated successfully.');
                setIsEditing(false);
            } else {
                alert('Failed to update user information.');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
            alert('An error occurred while updating user information.');
        }
        setIsEditing(false);

    };

    return (
        <div className='px-4 md:px-32 pt-16   pb-4 text-gray-800 text-xl flex flex-col md:flex-row gap-12'>
            {userInfo.map((user) => (
                <React.Fragment key={user.clientid}>
                    <div className='w-full md:w-1/4 py-96 border border-gray-300 rounded-xl h-screen px-10 space-y-8 text-lg pt-12 font-bold bg-white shadow-md'>
                        <img src={`http://localhost/ecommerce%20project/client/${user.photo}`} alt="" className='w-full h-32 rounded-xl object-cover' />
                        <div className={`cursor-pointer hover:text-orange-700 ${state === 'info' && 'text-orange-700'}`} onClick={() => setState('info')}>
                        Informations générales                        </div>
                        <div className={`cursor-pointer hover:text-orange-700 ${state === 'pay' && 'text-orange-700'}`} onClick={() => setState('pay')}>
                        Liste de souhaits
                        </div>
                        <div className={`cursor-pointer hover:text-orange-700 ${state === 'author' && 'text-orange-700'}`} onClick={() => setState('author')}>
                            derniere téléchargement
                        </div>
                        <button className='cursor-pointer hover:text-orange-700 flex gap-2 items-center' 
              onClick={() => { setLogin(false); localStorage.setItem('isLoggedIn', 'false'); setUserRole('client') ; navigate("/") ;  localStorage.setItem('userData' , 'false')}}>
                <IoMdExit/>  <span>Logout</span></button>
                    </div>
                    {state === 'info' ? (
                        <div className='w-full h-full border border-gray-300 text-xl rounded-xl px-6 md:px-12 text-gray-800 bg-white shadow-md'>
                            <div className='space-y-6'>
                                {isEditing ? (
                                    <>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Nom de l'utilisateur</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>l'Email</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Pays</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Sexe</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="text"
                                                    name="Gender"
                                                    value={formData.Gender || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Date de naissance</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="date"
                                                    name="dateBirth"
                                                    value={formData.dateBirth || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Nombre de téléphone</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Image</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    onChange={handleFileChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-end mt-4'>
                                            <button className='bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800' onClick={handleSave}>Save</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Nom de l'utilisateur</div>
                                            <div className='w-full md:w-1/2'>{user.username}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>l'Email</div>
                                            <div className='w-full md:w-1/2'>{user.email}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Pays</div>
                                            <div className='w-full md:w-1/2'>{user.country}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Sexe</div>
                                            <div className='w-full md:w-1/2'>{user.Gender}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Date de naissance</div>
                                            <div className='w-full md:w-1/2'>{user.dateBirth}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Nombre de téléphone</div>
                                            <div className='w-full md:w-1/2'>{user.phone}</div>
                                        </div>
                                        <div className='flex justify-end mt-4'>
                                            <button className='bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800' onClick={handleEdit}>Modify</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : state === 'pay' ? (
                        <div className='w-full h-full border border-gray-300 text-xl rounded-xl px-6 md:px-12 text-gray-800 bg-white shadow-md'>
                            <h2 className='text-4xl font-bold mb-4 text-center '>Liste de souhaits</h2>
                            <div className='flex flex-wrap gap-8'>
                                {/* Add relevant payout information here */}
                                {wishlist.map((book)=>{
                                   return (
                                    <div className='rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl w-40'>
                                        <div className='relative'>
                                            <img src={`http://localhost/ecommerce%20project/admin/${book.images}`} className='w-full h-44 object-cover rounded-t-xl' alt={book.name} />
                                            <div className='absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                                <Link to={`http://localhost:5173/products/categorie/${book.name}/${book.productid}`} className='text-white bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-lg'>View Details</Link>
                                            </div>
                                        </div>
                                        <div className='p-4 bg-white'>
                                            <h3 className='text-lg font-bold text-gray-800 mb-1'>{book.name}</h3>
                                            <p className='text-gray-600 mb-1'>by {book.autheur}</p>
                                            <p className='text-orange-600 font-semibold'>{book.price} DH</p>
                                        </div>
                                    </div>
                                );
                                
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className='w-full h-full border border-gray-300 text-xl rounded-xl px-6 md:px-12 text-gray-800 bg-white shadow-md'>
                            <h2 className='text-2xl font-semibold mb-4'>Author Information</h2>
                            <div>
                                {/* Add relevant author information here */}
                                Author details...
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Profile;
