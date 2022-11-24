import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Categories = () => {
    const data = useLoaderData();
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 md:px-40 gap-10 px-4'>
            {
                data.map(category =>
                    <div key={category._id} className='flex flex-col items-center my-10' >
                        <img src={category.image} alt={category.name} className='md:w-[384px] md:h-[264px] rounded-3xl' />
                        <div className='-mt-40'>
                            <h1 className='font-bold text-2xl text-black mb-2 shadow-md'>{category.name}</h1>
                            <Link to={`/categories/${category.name}`}>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Explore</button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Categories;