import React from 'react'
import { createContext , useState} from 'react'
import { MdLocalCafe } from 'react-icons/md';
export const contextProviderInfo = createContext();

const ContextProviderClient = ({children}) => {
    const [userData ,setUserData ] = useState([]);
    const [userExist , SetUserExist] = useState(false);
    const [currentCtg , setCurrentCtg ] = useState();
    const clientdata = JSON.parse(localStorage.getItem('userData'));    const [login , setLogin] = useState(localStorage.getItem('isLoggedIn') === 'true');
  return (
    <contextProviderInfo.Provider value={{userData ,login , clientdata  , setLogin, setUserData , userExist , SetUserExist , currentCtg , setCurrentCtg}}>
        {children}
        
    </contextProviderInfo.Provider>
  )
}

export default ContextProviderClient