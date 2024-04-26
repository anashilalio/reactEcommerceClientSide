import { useState } from "react";
import Products from "./pages/client/products";
import { Route , Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/client/Home";
import ContactUs from "./pages/client/ContactUs";
import Login from "./pages/Login";
import AddProductForm from "./pages/admin/AddProductForm";
Login
function App() {
  const [isClient , setIsClient ] = useState(true);
  return (
    <>
    <Navbar item={isClient}/>

      {isClient ?
      <div>
       
       
      </div>
            :
          <div>
          </div>


      }
       <Routes>
          <Route path="/products" element={<Products/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/addProductForm" element={<AddProductForm/>}/>
        </Routes>
    </>
  )
}

export default App;