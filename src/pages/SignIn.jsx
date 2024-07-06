import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/textLogo.png';
import cover from '../../public/cover10.png';

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [joined, setJoined] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [sexe, setSexe] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");



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
          country,
          joined,
          type,
          date , 
          phone, 
          sexe
          
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
    setCountry("");
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setJoined(`${year}-${month}-${day}`);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 pt-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
        <div className="bg-green-900 p-12 flex flex-col items-center justify-center">
          <img src={cover} className="w-96 h-96" alt="Cover" />
        </div>
        <div className="p-8 md:p-16">
          <form onSubmit={handleSignIn} className="flex flex-col space-y-6">
            <h1 className="font-black text-4xl flex items-center justify-center mb-8">
              <img src={logo} className="w-32 h-12" alt="Logo" />
            </h1>
            {invalidInput && (
              <div className="bg-red-600 text-white py-2 px-4 rounded-md">
               Veuillez saisir un nom d'utilisateur ou un mot de passe valide
              </div>
            )}
            {error && (
              <div className="bg-red-600 text-white py-2 px-4 rounded-md">
                {error}
              </div>
            )}
            <div className='flex gap-4'>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nom d'utilisateur"
              className="h-12 w-full border rounded-md px-4"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="h-12 w-full border rounded-md px-4"
            />
            </div>
            <div className='flex gap-4'>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="h-12 w-full border rounded-md px-4"
            />
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-12 w-full border rounded-md px-4 bg-white"
            >
              <option value="" disabled>
              Sélectionnez votre pays              </option>
              <option value="MAR">Morocco (MAR)</option>
              <option value="FRA">France (FRA)</option>
              <option value="USA">United States (USA)</option>
              <option value="CAN">Canada (CAN)</option>
              <option value="CHN">China (CHN)</option>
              <option value="DEU">Germany (DEU)</option>
              <option value="GBR">United Kingdom (GBR)</option>
            </select>
            </div>
            <div className='flex gap-4'>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-12 w-full border rounded-md px-4 bg-white"
            >
              <option value='' disabled>Type</option>

              <option value="client">Client</option>
              <option value="buyer">SupClient</option>
            </select>
            <select
              name="sexe"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              className="h-12 w-full border rounded-md px-4 bg-white"
            >
              <option value='' disabled>Sexe</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
            </div>
            <div className='flex gap-4'>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="phone"
              className="h-12 w-full border rounded-md px-4"
            />
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="date"
              className="h-12 w-full border rounded-md px-4"
            />
            </div>
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
    </div>
  );
};

export default SignIn;
