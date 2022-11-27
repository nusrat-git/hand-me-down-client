import React, { useContext } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const BookModal = ({ open, setOpen, modalProduct }) => {
    
    // console.log(modalProduct.resale_price);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const cancelButtonRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const onSubmit = data => {
        console.log(data);
        fetch('http://localhost:5000/booked', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
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

    const handleClose = () => {
        setOpen(false);
        navigate(`/categories/${modalProduct.category}`);
    }


    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className=''>
                                            <form className='pl-8' onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-6">
                                                    <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Product </label>
                                                    <input type="text" {...register("product", { required: true })} id="product" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" defaultValue={modalProduct.product} readOnly />
                                                    {errors.product && <span>This field is required</span>}
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Category </label>
                                                    <input type="text" {...register("category", { required: true })} id="category" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" defaultValue={modalProduct.category} readOnly />
                                                    {errors.category && <span>This field is required</span>}
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Location</label>
                                                    <input type="text" {...register("location", { required: true })} id="location" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                                                    {errors.location && <span>This field is required</span>}
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Price</label>
                                                    <input type="text" {...register("price", { required: true })} id="price" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " defaultValue={`${modalProduct.resale_price}$`} readOnly />
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
                                                <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto" placeholder='Add' />
                                            </form>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={handleClose}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Toaster />
        </div>

    );
};

export default BookModal;