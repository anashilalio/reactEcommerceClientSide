import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { GrUp } from "react-icons/gr";
import { GrDown } from "react-icons/gr";

const Book = () => {
    const [loading, setLoading] = useState(true)
    const { book } = useParams();
    const [bookI, setBookI] = useState([]);
    const [extend, setExtend] = useState(false);
    useEffect(() => {
        const bookInfo = async () => {
            const response = await fetch("http://localhost/ecommerce%20project/client/Product.php");
            const jsson = await response.json();
            setBookI(jsson)
            setLoading(false)
        }
        bookInfo();
    }, [])
    const filterBook = bookI.filter(e => e.name === book);
    return (
        <div className='mt-28'>
            {loading ?
                <div role="status" className=' flex justify-center  items-center bg-black h-screen -mt-28 '>
                    <svg aria-hidden="true" class="w-20 h-20 text-center text-gray-200 animate-spin dark:text-gray-600 fill-gray-300" viewBox="0 0 100 101" fill="none"  >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                :
                <div>       
    {filterBook.map((bk) => {
                    return <>
                        <div className='ml-20 flex gap-4 mb-12'>
                            <div>
                                <img className='h-96 shadow-2xl sticky top-28' src={`http://localhost/ecommerce%20project/admin/${bk.images}`} alt="" />

                            </div>
                            <div className='w-2/4 mx-auto'>
                                <div className='text-xl w-full '>{bk.autheur}</div>

                                <div className='flex justify-between w-120 items-center '>
                                    <div className='text-4xl'>{bk.name}</div>

                                </div>
                                <div className='mt-4 text-orange-500 flex items-center'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <div className='text-black'>
                                        (1)
                                    </div>

                                </div>
                                <div className='text-4xl mt-12 '>{bk.price}.00$</div>
                                <button className='bg-black text-white px-8 py-2 text-3xl rounded-2xl mt-12 w-full hover:bg-opacity-90 shadow-2xl'>
                                    Add to Cart
                                </button>
                                <div className='w-full  flex justify-center '>
                                    <button className='border px-8 py-2 text-xl rounded-2xl mt-6 hover:bg-gray-100  shadow-xl'>
                                        Add to wishlist
                                    </button>
                                </div>
                                <div>
                                    <div className={`${extend && 'line-clamp-3'} mt-12`}>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis explicabo officia perferendis dolorem? Quasi molestiae cupiditate minima laborum impedit, reprehenderit aliquid ratione eius libero quas soluta nulla magni, quia quam! Iure aliquam perspiciatis tenetur debitis facilis molestiae praesentium iusto nesciunt perferendis soluta velit optio quis, eos totam. Libero est aut quos nihil sed similique, dolorum iste atque asperiores in minima repudiandae! Sint aspernatur numquam animi et voluptatum molestiae magni modi? Beatae impedit fuga possimus in aliquam vitae perferendis voluptas, similique aspernatur quo? Cumque, commodi voluptatibus labore molestias aspernatur ratione architecto enim quae magnam. Impedit tempora labore eius esse tempore. Id, sequi aperiam quia illum iusto sit eligendi. Enim blanditiis itaque ipsa odit molestiae dicta deleniti excepturi suscipit ducimus harum officiis nam esse nesciunt quam cum possimus officia, veniam iure culpa tenetur autem. Mollitia dolorum reiciendis repellat aut cum! A consectetur quos magni incidunt voluptatibus nemo itaque, sapiente officiis commodi doloribus facere, molestias assumenda voluptates! Excepturi pariatur mollitia rerum laboriosam repellendus totam illum esse fugit sunt sapiente harum odio reiciendis enim architecto quasi nesciunt voluptatem quas, quo placeat! Iure, delectus ipsa? Sed blanditiis quo veniam laboriosam quos modi, sunt quasi quod. Nostrum molestiae repellat nam esse sequi modi tempora, et cum?
                                    </div>
                                    <button className='w-full mx-auto text-gray-400 '>
                                        {extend ?
                                            <div onClick={() => setExtend(false)} ><GrDown className='mx-auto' /></div> :
                                            <div onClick={() => setExtend(true)}><GrUp className='mx-auto' /></div>
                                        }
                                    </button>
                                </div>

                            </div>



                        </div>


                    </>
                })}
            <div className='w-4/5 mx-auto mt-56'>
                <div className='text-4xl flex gap-32 items-center mb-12'>
                    <div>addReviews</div>

                    <div className='flex items-center'>
                        reviews
                        <div className='flex flex-col  ml-24 text-sm '>

                            <div className='flex items-center gap-2'>5 reviews
                                <div className='w-24 bg-gray-400 h-3 flex'>

                                    <div className='bg-blue-400 w-12'>

                                    </div>

                                </div>
                                (20)
                            </div>
                            <div className='flex items-center gap-2'>4 reviews
                                <div className='w-24 bg-gray-400 h-3 flex'>

                                    <div className='bg-blue-400 w-10'>

                                    </div>

                                </div>
                                (12)
                            </div>
                            <div className='flex items-center gap-2'>3 reviews
                                <div className='w-24 bg-gray-400 h-3 flex'>

                                    <div className='bg-blue-400 w-4'>

                                    </div>

                                </div>
                                (5)
                            </div>
                            <div className='flex items-center gap-2'>2 reviews
                                <div className='w-24 bg-gray-400 h-3 flex'>

                                    <div className='bg-blue-400 w-12'>

                                    </div>

                                </div>
                                (3)
                            </div>
                            <div className='flex items-center gap-2'>1 reviews
                                <div className='w-24 bg-gray-400 h-3 flex'>

                                    <div className='bg-blue-400 w-2'>

                                    </div>

                                </div>
                                (1)
                            </div>

                        </div>



                    </div>
                </div>
                <div className='flex flex-col gap-12'>
                    <div className='border-y-2'>
                        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, quas fugit. Optio, iure necessitatibus numquam nam, consequuntur quidem autem, nihil nostrum quisquam minus eveniet? Voluptatem quibusdam at est esse corporis modi officia aut a amet ducimus ut libero, nesciunt eveniet nam incidunt eius placeat itaque repellendus eos? Dicta asperiores voluptatem, facere blanditiis temporibus quo iure at beatae a laudantium exercitationem ut nam consequatur sed nemo voluptate illo maxime? Soluta saepe veritatis, asperiores corrupti facere amet vero assumenda commodi quasi aut pariatur sed quibusdam inventore necessitatibus, quae itaque animi unde impedit laudantium eveniet excepturi id minima ad. Aliquid ducimus soluta eaque!</div>
                    </div>
                    <div className='border-y-2'>
                        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, quas fugit. Optio, iure necessitatibus numquam nam, consequuntur quidem autem, nihil nostrum quisquam minus eveniet? Voluptatem quibusdam at est esse corporis modi officia aut a amet ducimus ut libero, nesciunt eveniet nam incidunt eius placeat itaque repellendus eos? Dicta asperiores voluptatem, facere blanditiis temporibus quo iure at beatae a laudantium exercitationem ut nam consequatur sed nemo voluptate illo maxime? Soluta saepe veritatis, asperiores corrupti facere amet vero assumenda commodi quasi aut pariatur sed quibusdam inventore necessitatibus, quae itaque animi unde impedit laudantium eveniet excepturi id minima ad. Aliquid ducimus soluta eaque!</div>
                    </div>
                    <div className='border-y-2'>
                        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, quas fugit. Optio, iure necessitatibus numquam nam, consequuntur quidem autem, nihil nostrum quisquam minus eveniet? Voluptatem quibusdam at est esse corporis modi officia aut a amet ducimus ut libero, nesciunt eveniet nam incidunt eius placeat itaque repellendus eos? Dicta asperiores voluptatem, facere blanditiis temporibus quo iure at beatae a laudantium exercitationem ut nam consequatur sed nemo voluptate illo maxime? Soluta saepe veritatis, asperiores corrupti facere amet vero assumenda commodi quasi aut pariatur sed quibusdam inventore necessitatibus, quae itaque animi unde impedit laudantium eveniet excepturi id minima ad. Aliquid ducimus soluta eaque!</div>
                    </div>
                    <div className='border-y-2'>
                        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, quas fugit. Optio, iure necessitatibus numquam nam, consequuntur quidem autem, nihil nostrum quisquam minus eveniet? Voluptatem quibusdam at est esse corporis modi officia aut a amet ducimus ut libero, nesciunt eveniet nam incidunt eius placeat itaque repellendus eos? Dicta asperiores voluptatem, facere blanditiis temporibus quo iure at beatae a laudantium exercitationem ut nam consequatur sed nemo voluptate illo maxime? Soluta saepe veritatis, asperiores corrupti facere amet vero assumenda commodi quasi aut pariatur sed quibusdam inventore necessitatibus, quae itaque animi unde impedit laudantium eveniet excepturi id minima ad. Aliquid ducimus soluta eaque!</div>
                    </div>
                </div>

            </div>
            </div>
    }


        </div>
    )
}

export default Book