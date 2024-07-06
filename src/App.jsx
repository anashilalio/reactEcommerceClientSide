// App.js
import React, { useContext ,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/client/Home";
import ContactUs from "./pages/client/ContactUs";
import SignIn from "./pages/SignIn";
import AddProductForm from "./pages/admin/AddProductForm";
import Users from "./pages/admin/users";
import Login from "./pages/Login";
import ContextProviderClient, { contextProviderInfo } from "./context/ContextProvider";
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
import Reviews from "./pages/admin/Reviews";
import Products from "./pages/client/products";
import Dashboard from "./pages/buyer/dashboard";
import AddBook from "./pages/buyer/addBook"
import BooksStatus from "./pages/buyer/BooksStatus"
import BookReviews from "./pages/buyer/BookReviews"
import WaitingBooks from "./pages/admin/waitingBooks";
import Profiles from "./pages/buyer/Profile"

function App() {
  const { userRole } = useContext(contextProviderInfo);
  useEffect(()=>{

  },[userRole])
  return (
   <div>
      <Navbar item={userRole} />

      {userRole === 'client' ? (
        <div>
          <Routes>
            <Route path="/products/:categorie/:book/:id" element={<Book />} />
            <Route path="/categorie" element={<Categorie />} />
            <Route path="/products/:categorie" element={<Products />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      ) : userRole === 'buyer' ? (
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />  
            <Route path="/Login" element={<Login />} />
            <Route path="/Reviews" element={<BookReviews />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/Books" element={<BooksStatus />} />
            <Route path="/Profile" element={<Profiles />} />


          </Routes>
        </div>
      ) : userRole === 'admin' ? (
        <div>
          <Routes>
            <Route path="/Users" element={<Users />} />
            <Route path="/addProductForm" element={<AddProductForm />} />
            <Route path="/addCategorie" element={<AddCategorie />} />
            <Route path="/Books" element={<Books />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/waitingBooks" element={<WaitingBooks />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/" element={<Charts />} />
            <Route path="/Login" element={<Login />} />
            
          </Routes>
        </div>
      ) : (
        <div>
          {/* Fallback or default content */}
        </div>
      )}
    </div>
  );
}

export default App;
