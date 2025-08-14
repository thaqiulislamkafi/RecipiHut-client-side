import React from 'react';
import { FaFirstOrder, FaPlusCircle, FaUser } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { MdOutlineNoMeals } from 'react-icons/md';
import { TbMoneybag } from "react-icons/tb";
import { NavLink } from 'react-router';

const MenuBar = () => {

    const role = 'seller';
    const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png';


    const commonLinks = [
        { to: '/dashboard/profile', label: 'My Profile', icon: <FaUser /> },
        { to: '/dashboard/my-order', label: 'My Order', icon: <IoFastFood /> }
    ]

    const sellerLinks = [
        { to: '/dashboard/addRecipe', label: 'Add Recipe', icon: <FaPlusCircle /> },
        { to: '/dashboard/my-recipe', label: 'My Recipe', icon: <MdOutlineNoMeals /> },
        { to: '/myEarnings', label: 'My Earnings', icon: <TbMoneybag /> }
    ]

    let links = [];
    if (role === 'seller') links = sellerLinks;
    const linksToShow = [...commonLinks, ...links];

    return (

        <div className='w-full h-screen bg-[#23BE0A] flex flex-col gap-2 sora-font'>

            <div className=''>

                <div className='logo flex items-center gap-1 my-4 w-3/4 mx-auto '>
                    <img className='w-10' src={whiteLogo} alt="" />
                    <p className='text-2xl poppins'>
                        <span className='font-bold text-white'>RecipeHut</span>
                    </p>
                </div>

                <div className=' h-1 w-full border-t border-gray-50 '></div>

                <div className=' navbar-start flex flex-col my-4 w-3/4 mx-auto'>
                    {
                        linksToShow.map(link => (
                            <NavLink to={link.to} className={({ isActive }) =>
                                `flex items-center w-full  gap-2 my-2 rounded-lg p-3 ${isActive ? `bg-gray-50 text-black` : `text-white hover:bg-[#bce6b58f]  hover:text-black hover:transition-all duration-500`}`
                            }>{link.label} {link.icon}</NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuBar;