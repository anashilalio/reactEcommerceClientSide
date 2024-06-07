import React from 'react'
import { useContext } from 'react'
import { contextProviderInfo } from '../../context/ContextProvider'
import Hero from '../../components/hero'
import Categories from '../../components/categories'
import BestBooks from '../../components/BestBooks'
import CustomersReviews from '../../components/customerReviews'
import AboutUs from '../../components/AboutUs'
import Footer from '../../components/footer'
import WhyUs from './whyUs'
export const Home = () => {
  return (
    <div className='overflow-x-hidden'>
     
      <Hero />
      <BestBooks />
      <WhyUs />
      <AboutUs />
      <CustomersReviews />
      
      <Footer />
    </div>
  )
}
export default Home