import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import useTitle from '../../hooks/useTitle';

const AllUsers = () => {

    useTitle('Users');

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    });

    const handleDelete = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success('User deleted successfully');
            });
    }

    const handleAdmin = id => {

        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
            .catch(err => console.log(err))

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
                                <span className="sr-only">Make admin</span>
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((usr, i) =>
                                <tr key={usr._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i + 1}. {usr.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        {usr.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        {usr.phone}
                                    </td>
                                    <td className="py-4 px-6">
                                        {usr.location}
                                    </td>
                                    <td className="py-4 px-6">
                                        {usr.role}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {
                                            usr.role !== 'Admin' && <button onClick={() => handleAdmin(usr._id)} className="font-medium text-blue-600 dark:bg-white dark:text-blue-500 hover:underline">make admin</button>
                                        }
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                    <button onClick={()=>{handleDelete(usr._id)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
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

export default AllUsers;