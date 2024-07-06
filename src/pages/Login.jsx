import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { contextProviderInfo } from '../context/ContextProvider';
import logo from '../../public/textLogo.png';
import cover from '../../public/cover10.png';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [invalidInput, setInvalidInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login, setLogin, SetUserExist, userRole, setUserRole } = useContext(contextProviderInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if (login) {
            window.location.reload();
            navigate("/");
        }
        setLogin(false);
    }, [login, navigate, setLogin]);

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (username !== "" && password !== "") {
            try {
                const response = await axios.post("http://localhost/ecommerce%20project/client/login.php", {
                    username,
                    password
                });
    
                if (response.data === "user doesn't exist") {
                    SetUserExist(false);
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                } else {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userData', JSON.stringify(response.data.clientid));
                    localStorage.setItem('userEmail', JSON.stringify(response.data.email));
    
                    let role = "client"; // Default role
    
                    if (response.data.type === "buyer") {
                        role = "buyer";
                    } else if (response.data.type === "admin") {
                        role = "admin";
                    }
    
                    setUserRole(role);
                    localStorage.setItem('userRole', role);
                    setLogin(true);
                    SetUserExist(true);
                }
            } catch (error) {
                console.error(error);
            }
            setInvalidInput(false);
        } else {
            setInvalidInput(true);
            setUsername("");
            setPassword("");
        }
    
        setLoading(false);
    };
    
    
    
    

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            {loading ? (
                <div role="status" className="flex justify-center items-center bg-black h-screen">
                    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-300" viewBox="0 0 100 101" fill="none">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
                    <div className="bg-green-900 p-12 flex flex-col items-center justify-center">
                        <img src={cover} className="w-64 h-72" alt="Cover" />
                    </div>
                    <div className="p-8 md:p-16">
                        <form onSubmit={signIn} className="flex flex-col space-y-6">
                            <h1 className="font-black text-4xl flex items-center justify-center mb-8">
                                <img src={logo} className="w-32 h-12" alt="Logo" />
                            </h1>
                            {invalidInput && (
                                <div className="bg-red-600 text-white py-2 px-4 rounded-md">
                                    Please enter a valid username or password
                                </div>
                            )}
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="h-12 w-full border rounded-md px-4"
                            />
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="h-12 w-full border rounded-md px-4"
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="h-12 w-full border rounded-md px-4"
                            />
                            <button
                                type="submit"
                                className={`h-12 w-full rounded-md text-white font-semibold ${
                                    username === "" || password === "" ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
