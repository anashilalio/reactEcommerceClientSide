import React from 'react'
import { createContext , useState} from 'react'
export const contextProviderInfo = createContext();

const ContextProviderClient = ({children}) => {
    const [userData ,setUserData ] = useState([]);
    const [userExist , SetUserExist] = useState(false);
    const [currentCtg , setCurrentCtg ] = useState();
    

    // const [login , setLogin] = useState(localStorage.getItem('isLoggedIn') === 'true');
  return (
    <contextProviderInfo.Provider value={{userData , setUserData , userExist , SetUserExist , currentCtg , setCurrentCtg}}>
        {children}
        
    </contextProviderInfo.Provider>
  )
}

export default ContextProviderClient