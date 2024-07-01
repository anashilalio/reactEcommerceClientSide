import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/textLogo.png';
import cover from '../../public/cover10.png';

export const SignIn = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(""); // Add country state
  const [joined, setJoined] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost/ecommerce%20project/client/signin.php", {
          username,
          password,
          email,
          country, // Include country in the request
          joined,
        });
        console.log(response.data);
        setLoading(false);
        navigate("/Login");
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Failed to sign in. Please try again.");
      }
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
    setUsername("");
    setPassword("");
    setEmail("");
    setCountry(""); // Clear country field
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate(); // Day is one-based
    setJoined(`${year}-${month}-${day}`);
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='bg-green-900 h-120 px-12 py-16 border shadow-lg rounded-l-2xl'>
        <img src={cover} className='w-64 h-72' alt="" />
      </div>
      <div>
        <form onSubmit={handleSignIn} className='w-auto bg-white border shadow-lg text-black rounded-r-2xl h-120 mx-auto px-16 py-16 flex flex-col items-center space-y-4'>
          <h1 className='font-black text-4xl'>
            <img src={logo} className='w-32 h-12' alt="" />
          </h1>
          {invalidInput && <div className='bg-red-600 text-white py-2 px-8'>Please enter a valid username or password</div>}
          {error && <div className='bg-red-600 text-white py-2 px-8'>{error}</div>}
          <div className='flex justify-between'>
            <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='h-10 w-60 outline-none px-4 border-b-2 border-black' />
          </div>
          <div className='flex justify-between'>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='h-10 w-60 outline-none px-4 border-b-2 border-black' />
          </div>
          <div className='flex justify-between'>
            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='h-10 w-60 outline-none px-4 border-b-2 border-black' />
          </div>
          <div className='flex justify-between'>
            <select type="text" name='country' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' className='h-10 w-60 outline-none px-4 border-b-2 border-black' >
              <option value="MAR">MAR</option>
              <option value="FRA">FRA</option>
              <option value="USA">USA</option>
              <option value="CAN ">CAN</option>
              <option value="CHN">CHN</option>
              <option value="DEU">DEU</option>
              <option value="GBR ">GBR</option>



            </select>
          </div>
          <input type="submit" className={username === "" || password === "" ? "bg-green-500 h-10 w-60 hover:bg-green-400 cursor-not-allowed text-white" : 'bg-green-500 h-10 w-60 hover:bg-green-400 cursor-pointer text-white'} disabled={loading} />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
