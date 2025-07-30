import React, { use } from 'react';
import Navbar from './Home/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from './Footer';
import { Loading } from './Provider/PrivateRoute';
import { AuthContext } from './Provider/AuthProvider';

const Home = () => {

    const navigation = useNavigation()
    const isNavigating = Boolean(navigation.location) ;
    const {darkMode,setDarkMode} = use(AuthContext) ;


    return (
        <div className={` ${darkMode ? 'dark' : ''} dark:bg-gray-800 dark:text-gray-200`}>
            <Navbar></Navbar>
            {isNavigating && <Loading />}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;