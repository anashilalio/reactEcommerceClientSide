import { useState } from "react";
import Products from "./pages/client/products";
import { Route , Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/client/Home";
import ContactUs from "./pages/client/ContactUs";
import SignIn from "./pages/SignIn";
import AddProductForm from "./pages/admin/AddProductForm";
import Users from "./pages/admin/users";
import Login from "./pages/Login";
import ContextProviderClient from "./context/ContextProvider";
import AddCategorie from "./pages/admin/addCategorie";
import Categorie from "./pages/client/Categorie";
import Cart from "./pages/client/Cart";

function App() {
  const [isClient , setIsClient ] = useState(false);
  return (
    <>
<ContextProviderClient>

    <Navbar item={isClient}/>

      {isClient ?
      <div>
       
       
      </div>
            :
          <div>
          </div>


      }
       <Routes>
          <Route path="/categorie" element={<Categorie/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/products/:categorie" element={<Products />} />

          <Route path="/SignIn" element={<SignIn />}/>
          <Route path="/addProductForm" element={<AddProductForm/>}/>
          <Route path="/Users" element={<Users/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/addCategorie" element={<AddCategorie/>}/>
          <Route path="/Cart" element={<Cart/>}/>

        </Routes>
</ContextProviderClient>

    </>
  )
}

export default App;