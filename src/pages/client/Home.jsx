import React from 'react'
import { useContext } from 'react'
import { contextProviderInfo } from '../../context/ContextProvider'
export const Home = () => {
  const {userData , userExist} = useContext(contextProviderInfo)
  return (
    <div>
      hello {userData.username}
    </div>
  )
}
export default Home