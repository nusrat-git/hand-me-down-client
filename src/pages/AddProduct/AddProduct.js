import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/Context/AuthProvider';
import product from '../../images/products.webp'

const condition = [
    {
        id: 1,
        name: 'Excellent'
    },
    {
        id: 2,
        name: 'Good'
    },
    {
        id: 3,
        name: 'Fair'
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AddProduct = () => {
    const [selected, setSelected] = useState(condition[0])
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const time = new Date();

    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const onSubmit = data => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const productDetails = {
                    category: data.category,
                    product: data.product,
                    description: data.description,
                    image: imgData.data.url,
                    condition: data.condition,
                    location: data.location,
                    original_price: data.original_price,
                    resale_price: data.resale_price,
                    seller: data.seller_name,
                    seller_email: data.seller_email,
                    seller_phone: data.seller_phone,
                    purchase_year: data.purchase_year,
                    use_period: data.use_period,
                    time: time
                };
                console.log(productDetails);
                if (imgData.success) {
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(productDetails)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success('Product added successfully');
                            // navigate('/myproducts');
                            navigate('/dashboard/dashboard/myproducts');
                        })
                        .catch(err => console.error(err))
                }
            })
    };

    return (
        <div>
            <div className=''>
                <div className=' md:flex md:flex-row-reverse w-fit mx-auto border rounded-2xl'>
                    <div>
                        <img src={product} alt="" className='h-full'/>
                    </div>
                    <form className='md:px-7 px-5 py-5' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-3xl font-bold mb-5 text-gray-700">Add a new product</h1>
                        <div className="mb-6">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Category </label>
                            <input type="text" {...register("category", { required: true })} id="category" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" />
                            {errors.category && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Product </label>
                            <input type="text" {...register("product", { required: true })} id="product" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" />
                            {errors.product && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Description </label>
                            <input type="text" {...register("description", { required: true })} id="description" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" />
                            {errors.description && <span>This field is required</span>}
                        </div>
                        <div className='mb-4'>
                            <div>
                                <Listbox value={selected} onChange={setSelected}>
                                    {({ open }) => (
                                        <>
                                            <Listbox.Label className="block text-sm font-medium text-gray-700 text-start mb-2 ml-3">Condition</Listbox.Label>
                                            <div className="relative mt-1">
                                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                    <span className="flex items-center">
                                                        <span className="ml-3 block truncate">{selected.name}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {condition.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                    )
                                                                }
                                                                value={person}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                        </div>

                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                )}
                                                                            >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Image</label>
                            <input type="file" {...register("image", { required: true })} id="image" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.image && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Location</label>
                            <input type="text" {...register("location", { required: true })} id="location" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.location && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="resale_price" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Resale Price</label>
                            <input type="text" {...register("resale_price", { required: true })} id="resale_price" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.resale_price && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="original_price" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Original Price</label>
                            <input type="text" {...register("original_price", { required: true })} id="original_price" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.original_price && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="purchase_year" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Year of purchase</label>
                            <input type="text" {...register("purchase_year", { required: true })} id="purchase_year" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.purchase_year && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="use_period" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Use Period</label>
                            <input type="text" {...register("use_period", { required: true })} id="use_period" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.use_period && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="seller_name" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Your name </label>
                            <input type="text" {...register("seller_name", { required: true })} id="seller_name" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " defaultValue={user?.displayName} readOnly />
                            {errors.seller_name && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="seller_email" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Your name </label>
                            <input type="text" {...register("seller_email", { required: true })} id="seller_email" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " defaultValue={user?.email} readOnly />
                            {errors.seller_email && <span>This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="seller_phone" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Your number</label>
                            <input type="text" {...register("seller_phone", { required: true })} id="seller_phone" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " />
                            {errors.seller_phone && <span>This field is required</span>}
                        </div>
                        <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " placeholder='Add' />
                    </form>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default AddProduct;