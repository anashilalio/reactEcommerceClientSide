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
    description: "The 7 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen R. Covey. Covey defines effectiveness as the balance of obtaining desirable results with caring for that which produces those results.",
    author: "Stephen R. Covey"
  },
  {
    image: deepwork,
    title: "Deep Work",
    description: "Deep Work: Rules for Focused Success in a Distracted World is a book by Cal Newport. The book argues that the ability to focus without distraction is a crucial skill that allows individuals to quickly master complicated information and produce better results in less time.",
    author: "Cal Newport"
  },
  {
    image: digitalMinimalism,
    title: "Digital Minimalism",
    description: "Digital Minimalism: Choosing a Focused Life in a Noisy World is a book by Cal Newport. The book presents a philosophy for technology use, arguing that we should be more intentional and selective in our use of digital tools.",
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
