import React, { useState, useEffect } from 'react';
import ahmed from '../../public/ahmed.jpg';
import imane from '../../public/imane.jpg';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CustomersReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const Reviews = [
    {
      name: 'Anas',
      photo: ahmed,
      review: "Cest un très bon produit. Je le recommande fortement!",
      rating: 4.5,
    },
    {
      name: 'Mohamed',
      photo: ahmed,
      review: 'La qualité est exceptionnelle et le service était excellent.',
      rating: 5,
    },
    {
      name: 'Imane',
      photo: imane,
      review: 'La qualité est exceptionnelle et le service était excellent.',
      rating: 4,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [Reviews.length]);

  return (
    <div className="flex flex-col items-center justify-center   text-white py-44 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8">Customer Reviews</h2>
      <div className="relative w-full max-w-4xl mx-auto h-44">
        <div className="overflow-hidden rounded-lg shadow-lg bg-green-800 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center mb-4">
                <img
                  src={Reviews[currentIndex].photo}
                  alt={Reviews[currentIndex].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-2xl font-semibold">
                    {Reviews[currentIndex].name}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(Reviews[currentIndex].rating) ? (
                          <FaStar className="text-yellow-500" />
                        ) : (
                          i < Reviews[currentIndex].rating && (
                            <FaStarHalfAlt className="text-yellow-500" />
                          )
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg text-center">
                {Reviews[currentIndex].review}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex mt-4 space-x-2">
        {Reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-yellow-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomersReviews;
