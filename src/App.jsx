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
import Books from "./pages/admin/Books";
import Categories from "./pages/admin/categories";
import Charts from "./pages/admin/charts";
import Book from "./pages/client/book";
import Profile from "./pages/client/Profile";
import Payment from "./pages/client/Payment";
import Search from "./pages/client/Search";
function App() {
  const [isClient , setIsClient ] = useState(true);
  return (
    <>
<ContextProviderClient>

    <Navbar item={isClient}/>

      {isClient ?
      <div>
        <Routes>
  <Route path="/products/:categorie/:book" element={<Book />} />
  <Route path="/categorie" element={<Categorie/>}/>
  <Route path="/products/:categorie" element={<Products />} />
  <Route path="/contactus" element={<ContactUs/>}/>
  <Route path="/profile" element={<Profile />}/>
  <Route path="/Search" element={<Search />}/>
  <Route path="/Payment" element={<Payment />}/>
  <Route path="/signin" element={<SignIn />}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/" element={<Home/>}/>
</Routes>
       
      </div>
            :
          <div>
                   <Routes>

              <Route path="/Users" element={<Users/>}/>
          <Route path="/addProductForm" element={<AddProductForm/>}/>
          <Route path="/addCategorie" element={<AddCategorie/>}/>
          <Route path="/Books" element={<Books/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/" element={<Charts/>}/>
          


          </Routes>

          </div>


      }
      {}
      
</ContextProviderClient>

    </>
  )
}

export default App;