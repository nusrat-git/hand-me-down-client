import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import category from '../../images/category.webp'

const AddCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const onSubmit = data => {
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
                const category = {
                    name: data.category,
                    image: imgData.data.url
                };
                console.log(category);
                if (imgData.success) {
                    fetch('http://localhost:5000/categories', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(category)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success('Category added successfully');
                        })
                        .catch(err => console.error(err))
                }
            })
    };

    return (
        <div className=' my-10 md:flex items-center w-fit mx-auto border rounded-2xl'>
            <div>
                <h1 className="text-3xl font-bold mb-10 text-gray-700">Add a new category</h1>
                <form className=' px-20' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3"> Name</label>
                        <input type="text" {...register("category")} id="category" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] p-2.5" placeholder="Sofa" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-600 text-start ml-3">Image</label>
                        <input type="file" {...register("image")} id="image" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[400px] p-2.5 " required />
                    </div>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " placeholder='Add' />
                </form>
            </div>
            <img src={category} alt="sofa" className='md:h-[600px] rounded-tr-xl rounded-br-xl' />
            <Toaster />
        </div>

    );
};

export default AddCategory;