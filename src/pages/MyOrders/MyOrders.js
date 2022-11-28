import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../shared/Context/AuthProvider';

const MyOrders = () => {

    useTitle('My Orders');

    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/booked?email=${user?.email}`;

    const { data: booked = [] } = useQuery({
        queryKey: ['Booked', user.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })

    return (
        <div>
            <div>
                {
                    booked.length === 0 ?
                        <h1>You have no orders</h1>
                        :
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            Image
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Name
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Price
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-right">
                                            Pay
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        booked.map((book, i) =>
                                            <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className='flex items-center gap-4'>
                                                        {i + 1}. <img src={book.image} alt="" className=' w-14 rounded-full' />
                                                    </div>
                                                </th>
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {book.product}
                                                </th>
                                                <td className="py-4 px-6">
                                                    {book.price}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <Link to={`/dashboard/dashboard/payment/${book._id}`}>
                                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">pay</button>
                                                    </Link>
                                                </td>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>


        </div>
    );
};

export default MyOrders;