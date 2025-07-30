import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { use, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router';
import { auth } from './Firebase/Authentication';
import { AuthContext } from './Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
// import { Helmet } from 'react-helmet-async';

const SignUp = () => {

    const googleProvider = new GoogleAuthProvider();
    const { user, setLoading, setUser } = use(AuthContext);
    const [close, setClose] = useState(true);
    const navigate = useNavigate();
    const location = useLocation()

    const { darkMode } = use(AuthContext);
    const blackLogo = 'https://i.postimg.cc/R0FMxb5w/Black-logo.png';
    const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png';

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    const handleToogle = () => {
        setClose(!close);
    }

    const handleGoogleSignIn = () => {

        signInWithPopup(auth, googleProvider)
            .then(result => {
                toast.success('Signed in successfully', {
                    toastId: 'User'
                });
                setLoading(false);
                console.log(result);
            })
            .catch(error => {
                toast.error('Signed in Failed')
                console.error(error);
            })
    }

    const handleSignUpWithEmail = (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photo.value;
        const password = e.target.password.value;

        if (passwordRegex.test(password) === false) {
            toast.error('Password have must at least Uppercase,Lower case and more than 6 letters');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                toast.success('Account Created Successfully');
                console.log(res);
                setUser({ ...user, email:email, displayName: name, photoURL: photoURL });
                       
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL
                })

                setLoading(false);
                navigate(`${location.state ? location.state : '/'}`);
         

    })
    }
    return (
        <div>
            {/* <Helmet>
                <title>Sign Up</title>
            </Helmet> */}

            <div className="hero bg-base-200 min-h-screen sora-font dark:bg-gray-800">
                <div className="hero-content flex-col lg:w-[500px] my-20">
                    <div className="text-center lg:text-left">
                        <div className='logo flex items-center gap-1 justify-center md:justify-start'>
                            <img className='w-8 lg:w-15' src={darkMode ? whiteLogo : blackLogo} alt="" />
                            <p className='text-3xl lg:text-5xl poppins'>
                                <span className='font-bold'>RecipeHut</span>
                            </p>
                        </div>

                    </div>
                    <div className="card bg-base-100 w-full min-w-sm lg:max-w-sm shrink-0 shadow-2xl dark:bg-gray-800">
                        <div className="card-body">
                            <p className='font-medium text-center text-base'>Create an Account</p>
                            <div className='border-t-2 border-dashed border-gray-200 my-4'></div>

                            <form onSubmit={handleSignUpWithEmail} className="fieldset">
                                <label className="label">Name</label>
                                <input type='text' name='name' className="input dark:bg-gray-800" placeholder="Name" />
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input dark:bg-gray-800" placeholder="Email" />
                                <label className="label">Photo URL</label>
                                <input type='text' name='photo' className="input dark:bg-gray-800" placeholder="Photo URL" />
                                <div className='relative'>
                                    <label className="label">Password</label>
                                    <input type={close ? 'password' : 'text'}
                                        name='password' className="input dark:bg-gray-800" placeholder="Password" />

                                    <p onClick={handleToogle} className='absolute link top-8 md:right-7 right-4'>
                                        {close ? <FaEye size={16} /> : <IoMdEyeOff size={17} />}
                                    </p>

                                </div>
                                <div><a className="">Already have an account? Please <Link to={'/login'}><span className='link'>Log in</span></Link></a></div>
                                <button className="btn btn-neutral mt-4">Sign Up</button>
                                <div onClick={handleGoogleSignIn} className="btn btn-outline mt-1">
                                    <span><FcGoogle size={20} /></span> <span>SignUp with Google</span></div>
                            </form >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;