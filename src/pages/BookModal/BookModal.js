import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { AuthContext } from '../../shared/Context/AuthProvider';

const BookModal = ({ product }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    // let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmit = data => {
        console.log(data);
        fetch('http://localhost:5000/booked', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Booked successfully');
            })
            .catch(err => console.error(err))
    };

    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <div>
                <button onClick={openModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-4">Book Now</button>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className=''>
                                <form className='pl-8' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-6">
                                        <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Product </label>
                                        <input type="text" {...register("product", { required: true })} id="product" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" defaultValue={product.product} readOnly />
                                        {errors.product && <span>This field is required</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Category </label>
                                        <input type="text" {...register("category", { required: true })} id="category" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" defaultValue={product.category} readOnly />
                                        {errors.category && <span>This field is required</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Location</label>
                                        <input type="text" {...register("location", { required: true })} id="location" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                                        {errors.location && <span>This field is required</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Price</label>
                                        <input type="text" {...register("price", { required: true })} id="price" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " defaultValue={`${product.resale_price}$`} readOnly />
                                        {errors.price && <span>This field is required</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="buyer_name" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Your name </label>
                                        <input type="text" {...register("buyer_name", { required: true })} id="buyer_name" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " defaultValue={user?.displayName} readOnly />
                                        {errors.buyer_name && <span>This field is required</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="buyer_email" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Your email </label>
                                        <input type="text" {...register("buyer_email", { required: true })} id="buyer_email" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " defaultValue={user?.email} readOnly />
                                        {errors.buyer_email && <span>This field is required</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="buyer_phone" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Your number</label>
                                        <input type="text" {...register("buyer_phone", { required: true })} id="buyer_phone" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                                        {errors.buyer_phone && <span>This field is required</span>}
                                    </div>
                                    <div className='flex justify-between'>
                                        <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" placeholder='Add' />
                                        <button onClick={closeModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <Toaster />
        </div>
    );
};

export default BookModal;