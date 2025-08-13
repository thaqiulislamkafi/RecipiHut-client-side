import React, { use } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
// import { auth } from './Firebase/Authentication';
import { auth } from '../Firebase/Authentication';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {

    const { user, darkMode, setDarkMode } = use(AuthContext);

    const blackLogo = 'https://i.postimg.cc/R0FMxb5w/Black-logo.png';
    const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png' ;

    const location = useLocation();
    
    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        console.log(darkMode);
    }

    const handleSignOut = () => {

        signOut(auth).then(() => {
            toast.success('Logged Out Successfull')
            console.log("Sign Out SuccessFull")
        })
            .catch(error => {
                toast.error('An error Occurred');
                console.log(error);
            })
    }

    return (
        <div>

            <div className="navbar Navbar-three-colomn w-[85.94vw] mx-auto sora-font">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="-ml-6 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-4 dark:text-gray-200 dark:bg-gray-700">

                            <NavLink to={"/"}>Home</NavLink>
                            <NavLink to={"/allRecipe"}>All Recipes</NavLink>
                            <NavLink to={"/addRecipe"}>Add Recipe</NavLink>
                            {user && <NavLink to={"/myRecipe"}>My Recipes</NavLink>}

                            <div className='flex md:hidden gap-2 sora-font'>
                                <p>Dark Mode :</p>
                                <label className="flex cursor-pointer gap-2 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5" />
                                        <path
                                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>
                                    <input type="checkbox" value="synthwave" className="toggle theme-controller " onClick={handleDarkMode} />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                </label>
                            </div>
                        </ul>
                    </div>
                    <div className='logo flex items-center gap-1'>
                        <img className='w-10' src= {darkMode ? whiteLogo : blackLogo} alt="" />
                        <p className='text-2xl poppins'>
                            <span className='font-bold'>RecipeHut</span>
                        </p>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="">
                        <div className='pageButtton'>

                            <ul className='Nav-mid mt-0.5 poppins'>
                                <NavLink to={"/"}>Home</NavLink>
                                <NavLink to={"/allRecipe"}>All Recipes</NavLink>
                                <NavLink to={"/addRecipe"}>Add Recipe</NavLink>
                                {user && <NavLink to={"/myRecipe"}>My Recipes</NavLink>}

                            </ul>
                        </div>
                    </ul>
                </div>
                <div className='Nav-last navbar-end items-center'>

                    <div>
                        <label className="flex cursor-pointer gap-2 hidden md:flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                            <input type="checkbox" value="synthwave" className="toggle theme-controller " onClick={handleDarkMode} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </label>
                    </div>
                    {
                        user &&
                        <Link to={'/dashboard/profile'} className="tooltip tooltip-left" data-tip={user?.displayName}>
                            <div className='rounded-full p-1 bg-base-200'>
                                <img className='rounded-full w-10' src={`${user?.photoURL}`} alt="" />
                            </div>
                        </Link>
                    }

                    <div>
                        {
                            user ? <Link to={''}> <button onClick={handleSignOut} className='Button bg-[#23BE0A] text-white'>Sign Out</button> </Link>
                                : (
                                    <div className='flex items-center'>
                                        <Link to={'/login'}> <button className='Button bg-[#23BE0A] text-white mx-1'>Sign In</button> </Link>

                                        <Link to={'/signup'} > <button className='Button bg-[#23BE0A] text-white mx-1 hidden lg:flex'>Sign Up</button> </Link>
                                    </div>
                                )
                        }

                    </div>


                </div>
            </div>
        </div>
    );
};

export default Navbar;