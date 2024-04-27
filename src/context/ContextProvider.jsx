import React from 'react'
import { createContext , useState} from 'react'
export const contextProviderInfo = createContext();

const ContextProviderClient = ({children}) => {
    const [userData ,setUserData ] = useState([]);
    const [userExist , SetUserExist] = useState(false);
  return (
    <contextProviderInfo.Provider value={{userData , setUserData , userExist , SetUserExist}}>
        {children}
        
    </contextProviderInfo.Provider>
  )
}

export default ContextProviderClient