import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import useTitle from '../../hooks/useTitle';

const ReportedItems = () => {
    useTitle('Reported Items');

    const { data: reported = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reported', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    });

    const handleDelete = id => {
        fetch(`http://localhost:5000/reported/${id}`, {
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

    return (
        <div>
            {
                reported.length === 0 ?
                    <h1>No reported items found</h1>
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
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reported.map((report, i) =>
                                        <tr key={report._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-center gap-4'>
                                                    {i + 1}. <img src={report.image} alt="" className=' w-14 rounded-full' />
                                                </div>
                                            </th>
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {report.product}
                                            </th>
                                            <td className="py-4 px-6">
                                                {report.resale_price}$
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button onClick={() => { handleDelete(report._id) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
            <Toaster/>
        </div>
    );
};

export default ReportedItems;