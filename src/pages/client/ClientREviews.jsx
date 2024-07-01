import React from 'react';
import defaultPhoto from '../../../public/defaultProfile.webp';
import { FaStar } from "react-icons/fa";

const ClientReviews = ({ review, name, rate, dat, photo }) => {
    return (
        <div className="shadow-lg rounded-xl p-6 bg-white transition-transform transform ">
            <div className="flex items-center gap-6 mb-4">
                <img
                    src={photo ? `http://localhost/ecommerce%20project/client/${photo}` : defaultPhoto}
                    alt="Profile"
                    className="size-12 rounded-full object-cover"
                />
                <div>
                    <div className="text-xl font-semibold text-gray-800">{name}</div>
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`${rate > index ? 'text-green-500' : 'text-gray-300'} transition-colors`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{dat}</p>
            <div className="text-gray-700">{review}</div>
        </div>
    );
};

export default ClientReviews;
