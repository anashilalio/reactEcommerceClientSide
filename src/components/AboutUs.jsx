import React, { useEffect, useRef } from 'react'
import ebook from '../../public/48.webp'
import deepwork from '../../public/deepwork.webp'
import habit from '../../public/7habit.webp'

import mastery from '../../public/mastery.jpg'

import reading from '../../public/libary.webp'
import { motion, useAnimation, useInView } from "framer-motion"

const AboutUs = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);

  const isInview = useInView(ref, { once: true });
  const isInview2 = useInView(ref2, { once: true });

  const mainControls = useAnimation();
  const mainControls2 = useAnimation();

  useEffect(() => {
    if (isInview) {
      mainControls.start("visible")
    }
  }, [isInview])
  useEffect(() => {
    if (isInview2) {
      mainControls2.start("visible")
    }
  }, [isInview2])
  return (
    <div className=' text-black text-3xl rounded-2xl overflow-hidden mt-12'>
      <motion.div
        ref={ref}

        variants={{ hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate={mainControls}

        transition={{ duration: 1, delay: 0.25 }}>
        <div className='flex flex-nowrap  items-center justify-around  px-16 py-28 '>
          <div className='w-130  font-mono font-bold text-3xl  text-black'>

            Bienvenue à EBookShop, votre bibliothèque numérique pour des expériences de lecture captivantes. Depuis 2024, nous sommes passionnés par le fait de proposer des histoires captivantes et des connaissances aux lecteurs du monde entier.
          </div>


          <div className='flex gap-4'>
            <img src={ebook} alt="" className='h-96 rounded-2xl w-28 relative -bottom-8 shadow-xl' />
            <img src={deepwork} alt="" className='h-96 rounded-2xl w-28 bottom-8 relative shadow-xl' />
            <img src={habit} alt="" className='h-96 rounded-2xl w-28 bottom-16 relative shadow-xl' />
            <img src={mastery} alt="" className='h-96 rounded-2xl w-28 bottom-24 relative shadow-xl' />

          </div>

        </div>
      </motion.div>
      <motion.div
        ref={ref2}

        variants={{ hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate={mainControls2}

        transition={{ duration: 1, delay: 0.25 }}
      >

        <div className='flex flex-nowrap  items-center justify-around  px-16 py-28 '>
          <div>
            <img src={reading} alt="" className='h-120 rounded-2xl  ' />
          </div>
          <div className='w-130 text-3xl font-mono font-semibold'>

          Nous nous engageons à fournir un service client exceptionnel. Notre équipe d'assistance dédiée est disponible 24h/24 et 7j/7 pour vous aider avec toutes vos questions ou problèmes. Du support technique aux recommandations de livres, nous sommes là pour vous aider.</div>




        </div>
      </motion.div>

    </div>
  )
}

export default AboutUs