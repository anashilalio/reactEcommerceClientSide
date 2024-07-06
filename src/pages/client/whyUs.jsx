import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { IoSearchSharp } from 'react-icons/io5';
import { FaStar, FaBookReader } from 'react-icons/fa';

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 1, delay: 0.25 }}
      className=""
    >
      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 items-center px-12">
      <div className="flex flex-col items-center text-center space-y-4 w-1/5 h-72 rounded-full bg-black text-white pt-12">
      <FaBookReader className="text-6xl text-white " />
          <div className="text-3xl font-semibold">Lisez n'importe où, n'importe quand</div>
          {/* <div className="text-gray-600">Our eBooks are compatible with all major devices and platforms, including Kindle, iPad, Nook, and smartphones.</div> */}
        </div>
        <div className="flex flex-col items-center text-center space-y-4 w-1/5 h-72 rounded-full bg-black text-white pt-12">
        <FaStar className="text-6xl " />
          <div className="text-3xl font-semibold">Avis</div>
          {/* <div className="text-gray-600">Join our vibrant community of book lovers! Share your thoughts, write reviews, and connect with other readers.</div> */}
        </div>
        <div className="flex flex-col items-center text-center space-y-4 w-1/5 h-72 rounded-full bg-black text-white pt-12">
        <IoSearchSharp className="text-6xl " />
          <div className="text-3xl font-semibold">Fonctionnalités de recherche et de surbrillance</div>
          {/* <div className="text-gray-600">Ebooks come with powerful search capabilities that let you find specific passages or topics quickly.</div> */}
        </div>
      </div>
    </motion.div>
  );
}

export default WhyUs;
