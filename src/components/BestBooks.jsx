import React, { useState } from 'react';
import habits from '../../public/7habits.jpg';
import deepwork from '../../public/deepwork.webp';
import digitalMinimalism from '../../public/digitalMinimalism.png';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaCircle } from "react-icons/fa6";

const books = [
  {
    image: habits,
    title: "The 7 Habits of Highly Effective People",
    description: "Les 7 habitudes des personnes hautement efficaces, publié pour la première fois en 1989, est un livre d'affaires et d'auto-assistance écrit par Stephen R. Covey. Covey définit l'efficacité comme l'équilibre entre l'obtention des résultats souhaités et le soin apporté à ce qui produit ces résultats.",
    author: "Stephen R. Covey"
  },
  {
    image: deepwork,
    title: "Deep Work",
    description: "Travail en profondeur : règles pour un succès ciblé dans un monde distrait est un livre de Cal Newport. Le livre soutient que la capacité de se concentrer sans distraction est une compétence cruciale qui permet aux individus de maîtriser rapidement des informations complexes et de produire de meilleurs résultats en moins de temps.",
    author: "Cal Newport"
  },
  {
    image: digitalMinimalism,
    title: "Digital Minimalism",
    description: "Minimalisme numérique : choisir une vie ciblée dans un monde bruyant est un livre de Cal Newport. Le livre présente une philosophie d'utilisation de la technologie, affirmant que nous devrions être plus intentionnels et sélectifs dans notre utilisation des outils numériques.",
    author: "Cal Newport"
  }
];

const BestBooks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  return (
    <div className='relative flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 h-screen mx-4 md:mx-16 mt-4 rounded-2xl space-y-12'>
      <div className='absolute top-3 flex gap-2 md:gap-6 text-2xl md:text-6xl font-bold'>
        Best Sellers
        <span className='bg-green-500 text-white rounded px-2'>Books</span>
      </div>
      <button onClick={prevSlide} className='p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:opacity-70'>
        <GrFormPrevious className='text-white text-2xl md:text-4xl' />
      </button>
      <div>
        <img src={books[currentIndex].image} alt={books[currentIndex].title} className='h-64 w-48 md:h-96 md:w-72 rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105' />
      </div>
      <div className='w-72 md:w-96 text-center md:text-left space-y-4 md:space-y-10'>
        <div className='text-xl md:text-3xl font-semibold'>
          {books[currentIndex].title}
        </div>
        <div className='text-sm md:text-base text-gray-700'>
          {books[currentIndex].description}
        </div>
        <div className='text-lg md:text-xl text-gray-800 font-medium'>
          {books[currentIndex].author}
        </div>
      </div>
      <button onClick={nextSlide} className='p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:opacity-70'>
        <MdNavigateNext className='text-white text-2xl md:text-4xl' />
      </button>
      <div className='absolute bottom-4 flex gap-2'>
        {books.map((_, index) => (
          <FaCircle
            key={index}
            className={`cursor-pointer ${currentIndex === index ? 'text-green-500' : 'text-green-200'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BestBooks;
