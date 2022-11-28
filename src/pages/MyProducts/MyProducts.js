import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
// import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../shared/Context/AuthProvider';

const MyProducts = () => {

    useTitle('My Products');

    const { user } = useContext(AuthContext);

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproducts/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    });

    const handleDelete = id => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetch(`http://localhost:5000/advertised/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`

                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    });
                refetch();
                toast.success('Product deleted successfully');
            });
    }

    const handleAdvertise = id => {
        fetch(`http://localhost:5000/advertised/${id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetch('http://localhost:5000/advertised', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(data)
                })
                toast.success('Advertised product in homepage')
            })
    }

    return (
        <div>
            <div>
                {
                    products.length === 0 ?
                        <h1>You no products for sale</h1>
                        :
                        <div>
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Product name
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Location
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Category
                                            </th>
                                            <th scope="col" className="py-3 px-6">

                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                <span className="sr-only"></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((book, i) =>
                                                <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {i + 1}. {book.product}
                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {book.location}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {book.category}
                                                    </td>
                                                    <td><button onClick={() => { handleDelete(book._id) }}>Delete</button></td>
                                                    <td><button onClick={() => { handleAdvertise(book._id) }}>Advertise</button></td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Toaster />
                        </div>
                }
            </div>
        </div>
    );
};

export default MyProducts;