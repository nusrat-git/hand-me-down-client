import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import product from '../../images/products.jpg'

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
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
                    image: imgData.data.url,
                    location: data.location,
                    original_price: data.original_price,
                    resale_price: data.resale_price,
                    seller: data.seller_name,
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
                        })
                        .catch(err => console.error(err))
                }
            })
    };

    return (
        <div>
            <div className='my-10 md:flex items-center w-fit mx-auto border rounded-2xl'>
                <div className='py-10'>
                    <h1 className="text-3xl font-bold mb-10 text-gray-700">Add a new product</h1>
                    <form className='md:px-20 px-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Category </label>
                            <input type="text" {...register("category")} id="category" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Product </label>
                            <input type="text" {...register("product")} id="product" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Image</label>
                            <input type="file" {...register("image")} id="image" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Location</label>
                            <input type="text" {...register("location")} id="location" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="resale_price" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Resale Price</label>
                            <input type="number" {...register("resale_price")} id="resale_price" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="original_price" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Original Price</label>
                            <input type="number" {...register("original_price")} id="original_price" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="use_period" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Use Period</label>
                            <input type="text" {...register("use_period")} id="use_period" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="seller_name" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Seller </label>
                            <input type="text" {...register("seller_name")} id="seller_name" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] w-full p-2.5 " required />
                        </div>
                        {errors.exampleRequired && <span>This field is required</span>}
                        <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " placeholder='Add' />
                    </form>
                </div>
                <img src={product} alt="sofa" className=' md:h-[955px] rounded-tr-xl rounded-br-xl' />
                <Toaster />
            </div>
        </div>
    );
};

export default AddProduct;