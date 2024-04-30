import React from 'react'
import { useContext } from 'react'
import { contextProviderInfo } from '../../context/ContextProvider'
import Hero from '../../components/hero'
import Categories from '../../components/categories'
import BestBooks from '../../components/BestBooks'
import CustomersReviews from '../../components/customerReviews'

export const Home = () => {
  return (
    <div>
     
      <Hero />
      <Categories />
      <BestBooks />
      <CustomersReviews />
    </div>
  )
}
export default Home