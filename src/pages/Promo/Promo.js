import React from 'react';
import { Link } from 'react-router-dom';

const Promo = () => {
    return (
        <div>
            <div className="relative overflow-hidden bg-white">
                <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Products at Cheaper Price
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">
                                This year, decorate your house within a budget. <br />
                                Buy from our trusted sellers.
                            </p>
                            <Link
                                to="/categories"
                            >
                                <button className="inline-block rounded-md border border-transparent bg-blue-600 mt-5 py-3 px-8 text-center font-medium text-white hover:bg-blue-700">
                                    Shop Products
                                </button>
                            </Link>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        src=" https://i.ibb.co/4gv9Z3X/2dnd.webp"
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://i.ibb.co/f8vxjBB/images.jpg"
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src=" https://i.ibb.co/K7c5hx3/slider-bed.jpg"
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://i.ibb.co/M9yhC2z/chair-pillow-176382-876.webp "
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src=" https://i.ibb.co/HY1qMC1/e55e2e79-28cf-4970-ba8c-cdd53dbc51e1-size1684x950.webp "
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://i.ibb.co/cxng14N/tcc-366view-01rgbcolor.jpg "
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://i.ibb.co/4KcFQrn/U033634-RM.jpg"
                                                        alt="" className="h-full w-full object-cover object-center md:h-[256] md:w-[176]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promo;