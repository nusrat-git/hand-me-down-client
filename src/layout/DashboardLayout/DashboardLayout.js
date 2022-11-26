import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../pages/SideBar/SideBar';
import Footer from '../../shared/Footer/Footer';
import NavigationBar from '../../shared/NavigationBar/NavigationBar';

const DashboardLayout = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className='flex gap-12'>
                <div className=''>
                    <SideBar></SideBar>
                </div>
                <div className='w-full lg:mt-10 lg:mr-10'>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;