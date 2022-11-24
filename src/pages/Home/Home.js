import React from 'react';
import Footer from '../../shared/Footer/Footer';
import Categories from '../Catergories/Categories';
import Header from '../Header/Header';

const Home = () => {

    return (
        <div>
            <Header></Header>
            <div>
                <h1 className='text-4xl font-bold mt-20 mb-10'>Categories</h1>
                <Categories></Categories>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;