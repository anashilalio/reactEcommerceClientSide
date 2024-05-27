import React from 'react'
import history from '../../public/categories/Historycategori.jpg';
import advanture from '../../public/categories/advatureCategorie.jpg';
import math from '../../public/categories/mathcategorie.jpg';
import fantasy from '../../public/categories/fantasycategorie.jpg';
import horror from '../../public/categories/horrorcategorie.webp';
import siencefiction  from '../../public/categories/sienceFiction.avif';
import children  from '../../public/categories/childrenCategorie.webp';
import police  from '../../public/categories/policeCategorie.webp';
import economy  from '../../public/categories/Economy.jpg';
import { Link } from 'react-router-dom';
const Categories = () => {
    const Categorie= ({image , title})=>{
        return<>
        <div className="categorie h-56 w-96 cursor-pointer hover:opacity-90 overflow-hidden relative rounded-2xl">
        <Link to={`products/${title}`}>
            <img src={image} alt="" className=' bg-cover h-full w-full -z-10'/>
            </Link>
            <div className="title  text-3xl absolute z-10 text-white top-20  w-full text-center bg-black bg-opacity-50 py-2 font-bold font-mono">{title}</div>
        </div>
        </>
        
    }
  return (
    <div className='space-y-6 '>
        <div className="title text-center text-5xl font-mono font-extrabold flex justify-center ">Categories </div>
        <div className="categories flex gap-4 items-center flex-wrap ml-20">
            <Categorie image={history} title="history"/>
            <Categorie image={advanture} title="advanture"/>
            <Categorie image={math} title="math"/>
            <Categorie image={horror} title="horror"/>
            <Categorie image={siencefiction} title="siencefiction"/>
            <Categorie image={fantasy} title="fantasy"/>
            <Categorie image={children} title="children"/>
            <Categorie image={police} title="children"/>
            <Categorie image={economy} title="children"/>


        </div> 
        <div className='flex '>
        <button className='mx-auto bg-blue-600 text-white font-mono font-extrabold
         px-6 py-2 rounded-3xl mb-5  hover:shadow-inherit hover:scale-105 ease duration-200 hover:shadow-2xl '><Link to='/categorie'>Explorez davantage</Link></button>
        </div>
    </div>
  )
}

export default Categories