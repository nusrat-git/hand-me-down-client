import { LockClosedIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../shared/Context/AuthProvider';
import useToken from '../../hooks/useToken';

const people = [
    {
        id: 1,
        name: 'Buyer'
    },
    {
        id: 2,
        name: 'Seller'
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Register = () => {

    const { userRegister, handleProfile } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const [userEmail, setUserEmail] = useState(null);

    const token = useToken(userEmail);

    const navigate = useNavigate();

    useEffect(()=>{
        if (token) {
            navigate('/');
        }
    },[token, navigate])

    const onSubmit = data => {
        console.log(data);
        userRegister(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
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
                        const user = {
                            name: data.name,
                            image: imgData.data.url,
                            email: data.email,
                            phone: data.phone,
                            role: selected.name,
                            location: data.location,

                        };
                        if (imgData.success) {
                            handleUser(data.name, imgData.data.url);
                            fetch('http://localhost:5000/users', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
                                .then(res => res.json())
                                .then(usrData => {
                                    console.log(usrData);
                                    setUserEmail(data.email);
                                    toast.success('User created successfully');
                                })
                                .catch(err => console.error(err))
                        }
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    };

    const handleUser = (name, image) => {
        const profile = {
            displayName: name,
            photoURL: image
        }

        handleProfile(profile)
            .then(() => { })
            .catch(error => console.error(error));
    }


    const [selected, setSelected] = useState(people[0])

    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Register your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className=" rounded-md shadow-sm">
                            <div>
                                <label htmlFor="Name">
                                    Name
                                </label>
                                <input
                                    id="Name"
                                    name="name"
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Name"
                                />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="Name">
                                    Image
                                </label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    {...register("image", { required: true })}
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Image"
                                />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", { required: true })}
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                                {errors.email && <span>This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="phone-number">
                                    Phone number
                                </label>
                                <input
                                    id="phone-number"
                                    name="phone"
                                    type="text"
                                    {...register("phone", { required: true })}
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Phone number"
                                />
                                {errors.phone && <span>This field is required</span>}
                            </div>
                            <div>
                                <div>
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium text-gray-700">Select User</Listbox.Label>
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
                                                            {people.map((person) => (
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
                            <div>
                                <label htmlFor="location">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    {...register("location", { required: true })}
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Location"
                                />
                                {errors.location && <span>This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    {...register("password", { required: true })}
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                {errors.password && <span>This field is required</span>}
                            </div>
                            <div>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Already have an account?
                                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Log In
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Register
                            </button>
                        </div>
                    </form>
                    <Toaster />
                </div>
            </div>
        </div>
    );
};

export default Register;