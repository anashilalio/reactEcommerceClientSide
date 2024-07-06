import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
 import { BrowserRouter } from 'react-router-dom'
 import ContextProviderClient from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ContextProviderClient>

    <App />
    </ContextProviderClient>

  </BrowserRouter>
    </React.StrictMode>
  ,
)
