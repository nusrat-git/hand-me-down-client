import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../shared/Context/AuthProvider';
import BookModal from '../BookModal/BookModal';

const Category = () => {
    const products = useLoaderData();

    const [open, setOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState({});

    const { setLoading } = useContext(AuthContext);

    const handleModal = id => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setModalProduct(data);
                setLoading(false);
            });
        setOpen(true);
    }


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
                                    <button type="button" onClick={() => { handleModal(product._id) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-4">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BookModal setOpen={setOpen} open={open} modalProduct={modalProduct}></BookModal>

        </div>
    );
};

export default Category;