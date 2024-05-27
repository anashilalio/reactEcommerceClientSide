import React, { useEffect } from 'react'
import { createContext , useState} from 'react'
import { MdLocalCafe } from 'react-icons/md';
export const contextProviderInfo = createContext();

const ContextProviderClient = ({children}) => {
    const [userExist , SetUserExist] = useState(false);
    const [currentCtg , setCurrentCtg ] = useState();
    const [search  , setSearch ] = useState();
    const [result , setResult ] = useState([]);
    const [listItems , setListItems ] = useState([]);

    const clientdata = JSON.parse(localStorage.getItem('userData')); 
       const [login , setLogin] = useState(localStorage.getItem('isLoggedIn') === 'true');
       
  return (
    <contextProviderInfo.Provider value={{ login , listItems , setListItems , result , setResult, clientdata,search , setSearch  , setLogin , userExist , SetUserExist , currentCtg , setCurrentCtg}}>
        {children}
        
    </contextProviderInfo.Provider>
  )
}

export default ContextProviderClient