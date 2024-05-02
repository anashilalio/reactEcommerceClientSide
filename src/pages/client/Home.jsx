import React from 'react'
import { useContext } from 'react'
import { contextProviderInfo } from '../../context/ContextProvider'
import Hero from '../../components/hero'
import Categories from '../../components/categories'
import BestBooks from '../../components/BestBooks'
import CustomersReviews from '../../components/customerReviews'
import AboutUs from '../../components/AboutUs'

export const Home = () => {
  return (
    <div>
     
      <Hero />
      <Categories />
      <BestBooks />
      <CustomersReviews />
      <AboutUs />
    </div>
  )
}
export default Home