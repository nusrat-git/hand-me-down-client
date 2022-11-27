import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import useTitle from '../../hooks/useTitle';

const Buyers = () => {

    useTitle('Buyers');

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/buyers');
            const data = await res.json();
            return data;

        }
    });

    const handleDelete = email =>{
        fetch(`http://localhost:5000/users/${email}`,{
            method: 'DELETE'
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
                            <th scope="col" className="py-3 px-6">
                                Number
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Location
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Role
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) =>
                                <tr key={buyer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i + 1}. {buyer.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        {buyer.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        {buyer.phone}
                                    </td>
                                    <td className="py-4 px-6">
                                        {buyer.location}
                                    </td>
                                    <td className="py-4 px-6">
                                        {buyer.role}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button onClick={()=>{handleDelete(buyer.email)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Toaster/> 
        </div>
    );
};

export default Buyers;