import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BookModal from '../Bookmodal/BookModal';

const Category = () => {
    const products = useLoaderData();

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

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map(product => (
                            <div key={product._id} className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                    <img
                                        src={product.image}
                                        alt={product.product}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <h3 className="text-lg text-gray-700">
                                            Product: {product.product}
                                        </h3>
                                        <h3 className="text-lg text-gray-700">
                                            Location: {product.location}
                                        </h3>
                                        <h3 className="text-lg text-gray-700">
                                            Seller: {product.seller}
                                        </h3>

                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Resale Price: {product.resale_price}$</p>
                                    <p className="text-sm font-medium text-gray-900">Original Price: {product.resale_price}$</p>
                                    <p className="text-sm font-medium text-gray-900">Use Period: {product.use_period}</p>
                                    <p className="text-sm font-medium text-gray-900">Posted: {product.time.substring(0, 10)}</p>
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