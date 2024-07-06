import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { contextProviderInfo } from '../../context/ContextProvider';
import { IoMdExit } from "react-icons/io";

const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const { clientdata } = useContext(contextProviderInfo);
    const [state, setState] = useState('info');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            const clientid = parseInt(clientdata);
            const response = await axios.post("http://localhost/ecommerce%20project/client/userInfo.php", { clientid });
            console.log(response.data);
            setUserInfo(response.data);
            setFormData(response.data[0]);
        };
        getUserInfo();
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

    const handleSave = async () => {
        try {
            const response = await axios.post("http://localhost/ecommerce%20project/client/updateUser.php", formData);
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
    };

    return (
        <div className='px-4 md:px-32 pt-12 h-screen pb-4 text-gray-800 text-xl flex flex-col md:flex-row gap-12'>
            {userInfo.map((user) => (
                <React.Fragment key={user.clientid}>
                    <div className='w-full md:w-1/4 h-full border border-gray-300 rounded-xl px-10 py-20 space-y-8 text-lg font-bold bg-white shadow-md'>
                        <img src={`http://localhost/ecommerce%20project/client/${user.photo}`} alt="" className='w-full h-32 rounded-xl object-cover' />
                        <div className='cursor-pointer hover:text-orange-700' onClick={() => setState('info')}>
                            General Information
                        </div>
                        <div className='cursor-pointer hover:text-orange-700' onClick={() => setState('pay')}>
                            Payout
                        </div>
                        <div className='cursor-pointer hover:text-orange-700' onClick={() => setState('author')}>
                            Author Information
                        </div>
                        <button className='cursor-pointer hover:text-orange-700 flex gap-2 items-center' 
              onClick={() => { setLogin(false); localStorage.setItem('isLoggedIn', 'false'); setUserRole('client') ;localStorage.setItem('userData' , 'false'); navigate("/")   }}>
                <IoMdExit/>  <span>Logout</span></button>
                    </div>
                    {state === 'info' ? (
                        <div className='w-full h-full border border-gray-300 text-xl rounded-xl px-6 md:px-12 text-gray-800 bg-white shadow-md'>
                            <div className='space-y-6'>
                                {isEditing ? (
                                    <>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Username</div>
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
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Email</div>
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
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Country</div>
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
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Gender</div>
                                            <div className='w-full md:w-1/2'>
                                                <input
                                                    type="text"
                                                    name="gender"
                                                    value={formData.gender || ''}
                                                    onChange={handleInputChange}
                                                    className='w-full px-4 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Birth Date</div>
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
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Phone</div>
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
                                        <div className='flex justify-end mt-4'>
                                            <button className='bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800' onClick={handleSave}>Save</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Username</div>
                                            <div className='w-full md:w-1/2'>{user.username}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Email</div>
                                            <div className='w-full md:w-1/2'>{user.email}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Country</div>
                                            <div className='w-full md:w-1/2'>{user.country}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Gender</div>
                                            <div className='w-full md:w-1/2'>{user.Gender}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Birth Date</div>
                                            <div className='w-full md:w-1/2'>{user.dateBirth}</div>
                                        </div>
                                        <div className='flex flex-col md:flex-row items-center justify-between py-4 border-b border-gray-200'>
                                            <div className='w-full md:w-1/2 text-2xl font-semibold'>Phone</div>
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
                            <h2 className='text-2xl font-semibold mb-4'>Payout Information</h2>
                            <div>
                                {/* Add relevant payout information here */}
                                Payout details...
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
