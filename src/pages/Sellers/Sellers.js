import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import useTitle from '../../hooks/useTitle';

const Sellers = () => {
    useTitle('Sellers');
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sellers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    });

    const handleDelete = id => {
        fetch(`http://localhost:5000/sellers/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success('Deleted successfully');
            });
    }

    const handleVerify = id => {

        fetch(`http://localhost:5000/sellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success('Verified successfully')
            })
            .catch(err => console.log(err))

    }


    return (
        <div>
            <div>
                {
                    sellers.length === 0 ?
                        <h1>No Seller created</h1>
                        :
                        <div>
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Name
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Email
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-right">
                                                Delete
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-right">
                                                Verify
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sellers.map((seller, i) =>
                                                <tr key={seller._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="flex items-center gap-2 py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {i + 1}. <div className='flex items-center'>
                                                            {seller.name} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                            </svg>
                                                        </div>

                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {seller.email}
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button onClick={() => { handleDelete(seller._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        {
                                                            seller.verify !== 'Verified' && <button onClick={() => handleVerify(seller._id)} className="font-medium text-blue-600 dark:bg-white dark:text-blue-500 hover:underline">Verify</button>
                                                        }
                                                    </td>
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

export default Sellers;