import React, { useContext } from 'react';
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Logo from '../../logo.ico';

const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Blogs', to: '/blogs' },
]

const NavigationBar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {

            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="isolate bg-white">

                <div className="px-6 pt-6 lg:px-8">
                    <div>
                        <nav className="flex h-9 items-center justify-between" aria-label="Global">
                            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                                <Link to="/" className=" flex items-center gap-2">
                                    <img className="h-12" src={Logo} alt="" />
                                    <h1 className='text-lg font-extrabold italic text-gray-600'>HAND ME DOWN</h1>
                                </Link>
                            </div>
                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                                {navigation.map((item) => (
                                    <Link key={item.name} to={item.to} className="font-semibold text-gray-900 hover:text-gray-900">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                                {
                                    user?.uid ?
                                        <button onClick={handleLogOut}
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Log Out
                                        </button>
                                        :
                                        <Link
                                            to="/login"
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Log In
                                        </Link>
                                }
                            </div>
                        </nav>
                        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                            <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                                <div className="flex h-9 items-center justify-between">
                                    <div className="flex">
                                        <Link to="/" className=" flex items-center gap-2">
                                            <img className="h-12" src={Logo} alt="" />
                                            <h1 className='text-lg font-extrabold italic text-gray-600'>HAND ME DOWN</h1>
                                        </Link>
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="py-6">
                                            {
                                                user?.uid ?
                                                    <button onClick={handleLogOut}
                                                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                                    >
                                                        Log Out
                                                    </button>
                                                    :
                                                    <Link
                                                        to="/login"
                                                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                                    >
                                                        Log In
                                                    </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;