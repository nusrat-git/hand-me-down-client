import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/Context/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/booked?email=${user?.email}`;

    const { data: booked = [] } = useQuery({
        queryKey: ['Booked', user.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    return (
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
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booked.map((book,i) =>
                                <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i+1}. {book.product}
                                    </th>
                                    <td className="py-4 px-6">
                                        {book.location}
                                    </td>
                                    <td className="py-4 px-6">
                                        {book.category}
                                    </td>
                                    <td className="py-4 px-6">
                                        {book.price}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyProducts;