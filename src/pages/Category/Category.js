import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import BookModal from '../Bookmodal/BookModal';

const Category = () => {
    const products = useLoaderData();

    useTitle('Category');

    return (
        <div>
            <h1>
                {
                    products.length === 1 ?
                        `${products.length} product found`
                        :
                        `${products.length} products found`
                }
            </h1>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 xl:gap-x-8" >
                        {products.map(product => (
                            <div key={product._id} className="group relative flex justify-between shadow-md rounded-xl bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.product}
                                    className=" object-cover object-center w-96 rounded-tl-xl rounded-bl-xl"
                                />
                                <div className="mt-4 p-6">
                                    <div>
                                        <h3 className="text-xl text-gray-900 font-bold mb-3">
                                            {product.product}
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Location: {product.location}</p>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Seller: {product.seller}</p>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Resale Price: {product.resale_price}$</p>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Original Price: {product.original_price}$</p>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Use Period: {product.use_period}</p>
                                    <p className="text-sm font-medium text-gray-900 mb-2">Posted: {product.time.substring(0, 10)}</p>
                                    <BookModal key={product._id} product={product}></BookModal>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Category;