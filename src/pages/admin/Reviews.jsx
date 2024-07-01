import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch("http://localhost/ecommerce%20project/admin/Reviews.php");
            const res = await response.json();
            setReviews(res);
        };
        fetchReviews();
    }, []);

    return (
        <div className='pl-64 bg-gray-100 min-h-screen p-8'>
            <div className='text-5xl text-center mb-12 font-semibold text-gray-800'>Avis</div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {reviews.map((review) => (
                    <div key={review.id} className='shadow-xl p-6 rounded-xl bg-white'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-4'>
                                <img src={`http://localhost/ecommerce%20project/client/${review.photo}`} className='size-12 rounded-full object-cover' alt={review.username} />
                                <div className='text-lg font-semibold text-gray-700'>{review.username}</div>
                            </div>
                            <div>
                                <p className='hover:underline text-green-600 text-sm'>{review.name}</p>
                            </div>
                        </div>
                        <div className='flex items-center mb-2'>
                            {[...Array(5)].map((star, index) => (
                                <FaStar
                                    key={index}
                                    className={`text-xl ${review.rate > index ? 'text-green-500' : 'text-gray-300'}`}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            ))}
                        </div>
                        <div className='text-sm text-gray-500 mb-4'>{review.dat}</div>
                        <div className='line-clamp-3 text-gray-700 text-base'>{review.comments}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
