import React, { createContext, useState, useEffect } from 'react';

export const contextProviderInfo = createContext();

const ContextProviderClient = ({ children }) => {
  const [userExist, SetUserExist] = useState(false);
  const [currentCtg, setCurrentCtg] = useState();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [listItems, setListItems] = useState([]);
  
  let storedUserData = localStorage.getItem('userData');
  const clientdata = storedUserData ? JSON.parse(storedUserData) : null;

  const [login, setLogin] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'client');
  console.log(clientdata)
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole , login , clientdata]);

  return (
    <contextProviderInfo.Provider value={{ 
      userRole,
      setUserRole,
      login, 
      listItems, 
      setListItems, 
      result, 
      setResult, 
      clientdata, 
      search, 
      setSearch, 
      setLogin, 
      userExist, 
      SetUserExist, 
      currentCtg, 
      setCurrentCtg 
    }}>
      {children}
    </contextProviderInfo.Provider>
  );
}

export default ContextProviderClient;
