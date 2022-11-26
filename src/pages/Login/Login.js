import { LockClosedIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { AuthContext } from '../../shared/Context/AuthProvider';

const Login = () => {

    const { userLogIn, setLoading } = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const token = useToken(userEmail);

    const from = location.state?.from?.pathname || '/';

    useEffect(()=>{
        if (token) {
            navigate(from, { replace: true });
        }
    },[token, navigate])



    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        userLogIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUserEmail(data.email);
                setLoading(false);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

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
                            Log in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
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
                                <label htmlFor="password" className="sr-only">
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
                                    Don't have an account?
                                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Register
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
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;