import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Footer from '../../shared/Footer/Footer';
import BookModal from '../Bookmodal/BookModal';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';

const Home = () => {

    const { data: advertised = [] } = useQuery({
        queryKey: ['advertised'],
        queryFn: async () => {
            const res = await fetch('https://hand-me-down-server.vercel.app/advertised', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleReport = id => {

        fetch(`https://hand-me-down-server.vercel.app/products/${id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(repData => {
                console.log(repData);
                fetch('https://hand-me-down-server.vercel.app/reported', {
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
            <Header></Header>
            <div>
                <h1 className='text-4xl font-bold mt-20 mb-10'>Categories</h1>
                <Categories></Categories>
            </div>
            <div>
                {
                    advertised.length !== 0 &&
                    <div>
                        <h1 className='text-4xl font-bold mt-20 mb-10'>Advertised Products</h1>
                        <div className='grid grid-cols-1 md:grid-cols-3 md:px-40 gap-10 px-4'>
                            {
                                advertised.map(product =>
                                    <div key={product._id} className='flex flex-col items-center my-10' >
                                        <img src={product.image} alt={product.name} className='md:w-[384px] h-[264px] rounded-3xl w-full' />
                                        <div className='-mt-40'>
                                            <h1 className='font-bold text-2xl text-black mb-2 shadow-md'>{product.product}</h1>
                                            <div className='flex items-center justify-center'>
                                                <button onClick={() => { handleReport(product._id) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-4">Report</button>
                                                <BookModal key={product._id} product={product}></BookModal>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div>

                        </div>
                    </div>
                }
            </div>
            <div className=" mt-32">
                <Promo></Promo>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;