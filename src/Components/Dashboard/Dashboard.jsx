import React, { use } from 'react';
import MenuBar from './MenuBar';
import { Outlet } from 'react-router';
import { IoMdNotifications } from 'react-icons/io';
import { AuthContext } from '../Provider/AuthProvider';
import { IoSearchOutline } from "react-icons/io5";

const Dashboard = () => {

    const {user} = use(AuthContext) ;

    return (
        <div className='flex  '>
            <div className='w-2/11'>
                <MenuBar />
            </div>

            <div className='w-9/11'>
                <div className='flex items-center gap-2 my-4 justify-end w-9/10'>
                    <div><IoSearchOutline /></div>
                    <div className='btn btn-xs rounded-full p-1 '><IoMdNotifications size={15} color='green'/></div>
                    <div className='rounded-full  w-6'><img className='rounded-full'  src={user?.photoURL} alt="" /></div>
                </div>
                <div className='w-9/10 mx-auto'><Outlet /></div>
            </div>
        </div>
    );
};

export default Dashboard;