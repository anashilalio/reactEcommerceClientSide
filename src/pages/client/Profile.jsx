import React, { useEffect, useContext, useState } from 'react';
import defaultPhoto from '../../../public/defaultProfile.webp';
import { contextProviderInfo } from '../../context/ContextProvider';
import axios from 'axios';
import { IoMdPhotos } from "react-icons/io";
import { Link } from 'react-router-dom';

const Profile = () => {
    const { clientdata, login, setLogin } = useContext(contextProviderInfo);
    const [wishlist, setWishlist] = useState([]);
    const [image, setImage] = useState();
    const [user, setUser] = useState();
    const [change, setChange] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    
    useEffect(() => {
        const getwishlist = async () => {
            const clientid = parseInt(clientdata);
            const response = await axios.post("http://localhost/ecommerce%20project/client/getWishlist.php", { clientid });
            const jssson = response.data;
            const promises = jssson.map(async (i) => {
                const responses = await fetch("http://localhost/ecommerce%20project/client/Product.php");
                const resp = await responses.json();
                return resp.find(element => element.productid === i.productid);
            });
            const respon = await fetch("http://localhost/ecommerce%20project/admin/usersList.php");
            const users = await respon.json();
            const userr = users.filter(e => parseInt(e.clientid) === parseInt(clientdata));
            setUser(userr[0].photo);
            const wishlistItems = await Promise.all(promises);
            setWishlist(wishlistItems.filter(item => item));
        }
        
        getwishlist();
    }, [clientdata]);
    
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    
    const handleChangePhoto = async () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('clientid', clientdata);
        await axios.post('http://localhost/ecommerce%20project/client/changePhoto.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    const handleLogout = () => {
        localStorage.removeItem('userData');
        setLogin(localStorage.setItem('isLoggedIn', 'false'));
    }
    
    return (
        <div className="mt-16 shadow-2xl rounded-2xl flex flex-col lg:flex-row w-full p-6 bg-white">
            <div className="shadow-xl p-4 flex flex-col items-center w-full lg:w-1/3">
                <div 
                    className={`relative h-24 w-24 rounded-full ${change ? 'opacity-75' : ''}`} 
                    onMouseEnter={() => setChange(true)} 
                    onMouseLeave={() => setChange(false)}
                >
                    {previewImage ? (
                        <img src={previewImage} className="h-24 w-24 rounded-full object-cover" />
                    ) : (
                        <img src={`http://localhost/ecommerce%20project/client/${user}`} className="h-24 w-24 rounded-full object-cover" />
                    )}
                    {change && (
                        <label htmlFor="fileUp" className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-50 rounded-full">
                            <IoMdPhotos className="text-white text-4xl" />
                        </label>
                    )}
                </div>
                <div className="text-2xl mt-4">{clientdata.username}</div>
                <div className="text-sm text-gray-500 mb-4">{clientdata.email}</div>
                <button 
                    className="hover:text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200 text-xl w-full text-center mb-4"
                    onClick={handleLogout}
                >
                    <Link to="/">Logout</Link>
                </button>
                <input type="file" id="fileUp" className="hidden" onChange={handleFileChange} />
                <button 
                    className="bg-blue-500 text-white px-8 py-2 mt-4 w-full text-center rounded-xl cursor-pointer hover:bg-blue-600"
                    onClick={handleChangePhoto}
                >
                    Submit
                </button>
            </div>
            <div className="w-full lg:w-2/3 flex flex-col items-center mt-12 lg:mt-0">
                <div className="text-center mb-8">
                    <div className="text-xl font-bold">Wishlist</div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {wishlist.map((wishl) => (
                            <div key={wishl.productid} className="h-32 w-20 rounded shadow-lg overflow-hidden">
                                <img src={`http://localhost/ecommerce%20project/admin/${wishl.images}`} className="w-full h-full object-cover" alt={wishl.name} />
                                <div className="text-center text-sm">{wishl.name}</div>
                                <div className="text-center text-sm font-bold">{wishl.price} DH</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
