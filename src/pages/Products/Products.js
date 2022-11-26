import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Products = () => {
    const data = useLoaderData();

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:px-40 gap-10 px-4'>
                {
                    data.map(product =>
                        <div key={product._id} className='flex flex-col items-center my-10' >
                            <img src={product.image} alt={product.name} className='md:w-[384px] h-[264px] rounded-3xl w-full'/>
                            <div className='-mt-40'>
                                <h1 className='font-bold text-2xl text-black mb-2 shadow-md'>{product.product}</h1>
                                <Link to={`/products/${product._id}`}>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Book Now</button>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Products;