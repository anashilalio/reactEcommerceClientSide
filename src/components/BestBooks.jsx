import React, { useState, useEffect, useRef } from 'react';
import habits from '../../public/7habits.jpg' 
import deepwork from '../../public/deepwork.webp' 
import digitalMinimalism from '../../public/digitalMinimalism.png' 
import { color } from 'framer-motion';
import { all } from 'axios';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const BestBooks = () => {
    
    const [card  , setcard] = useState(0);

    const BestSellers = ({images , title})=>{
        return(
            <div className={`h-auto w-64  duration-200 cursor-pointer shrink-0`} >
                <img src={images} alt="" className=' h-72 w-full'/>
                
            </div>
        )
    }
    const cardWidth = 120;
 const gap = 30;
const cardsInView =6;
const totalWidth = (cardWidth + gap) * cardsInView;
    const next =  ()=>{
        if (card < totalWidth * (books.length / cardsInView - 1)) {
            setcard(prevCard => prevCard + 2*(cardWidth +gap) );
          }
          console.log(card)
    }
    const prev =  ()=>{
        if(card>=cardWidth + gap){
            setcard(e=>e-2*(cardWidth + gap))
               
        
        }
   }
   const books= [
    {images : habits ,  title :"7 habits of effective people" },
    {images : digitalMinimalism ,  title :"7 habits of effective people" },
    {images : deepwork ,  title :"7 habits of effective people" },
    {images : digitalMinimalism ,  title :"7 habits of effective people" },
    {images : deepwork ,  title :"7 habits of effective people" },
    {images : habits ,  title :"7 habits of effective people" },
    {images : digitalMinimalism ,  title :"7 habits of effective people" },
    {images : deepwork ,  title :"7 habits of effective people" },
    {images : habits ,  title :"7 habits of effective people" },
    {images : digitalMinimalism ,  title :"7 habits of effective people" },


]
    return (
        <div  className='space-y-12 mt-4 font-mono font-extrabold relative'>
            <div className="bestBooks text-5xl text-center"> Meilleure vente </div>
            
            <button onClick={prev} className='absolute top-44 text-5xl left-44 z-10  bg-blue-500 text-white  rounded-full'><GrFormPrevious /></button>
            <div className=' flexustify-center overflow-hidden mx-auto ' style={{width:`${(cardWidth +gap) * cardsInView }px` }}>
            <div className='pl-4 flex gap-12' style={{transform:`translateX(-${card}px)` , transition:'all 2s'}}>
                {books.map((book)=>{
                        return <BestSellers images={book.images} title={book.title}/>
                })}

            </div>
            <button onClick={next} className='absolute top-56 z-10 right-44 text-5xl bg-blue-500 text-white  rounded-full'><MdNavigateNext /></button>
            </div>
            
            
            
        </div>
    )
}

export default BestBooks