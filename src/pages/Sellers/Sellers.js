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
                                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {i + 1}. {seller.name}
                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {seller.email}
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button onClick={() => { handleDelete(seller._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Verify</button>
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