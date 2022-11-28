import React from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import BookModal from '../Bookmodal/BookModal';

const Category = () => {
    const products = useLoaderData();

    useTitle('Category');

    const handleReport = id => {

        fetch(`http://localhost:5000/products/${id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(repData => {
                console.log(repData);
                fetch('http://localhost:5000/reported', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(repData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        toast.success('Reported successfully');
                    })
                    .catch(err => console.error(err))
            })
    }

    return (
        <div>
            <div>
                {
                    products.length === 0 ?
                        <h1>No products found</h1>
                        :
                        <div>
                            <div className="bg-white">
                                <h1 className=' -mb-14 mt-10'>
                                    {
                                        products.length === 1 ?
                                            `${products.length} product found`
                                            :
                                            `${products.length} products found`
                                    }
                                </h1>
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
                                                    <div className=''>
                                                        <button onClick={() => { handleReport(product._id) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-4">Report</button>
                                                        <BookModal key={product._id} product={product}></BookModal>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>

        </div>
    );
};

export default Category;