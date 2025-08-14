import React, { use } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from './Provider/AuthProvider';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from './Firebase/Authentication';
import { toast, ToastContainer } from 'react-toastify';
// import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { FormInput } from './AddRecipe';
import axiosSecure from './Hooks/useAxios';


const LogIn = () => {

    const {user,setLoading,setEmailValue,darkMode} = use(AuthContext); 

    const blackLogo = 'https://i.postimg.cc/R0FMxb5w/Black-logo.png';
    const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png' ;
    const {register,handleSubmit,formState:{errors}} = useForm() ;

    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate() ;
    const location = useLocation();
    const handleGoogleSignin = () => {

        signInWithPopup(auth, googleProvider)
            .then((res) => {
                toast.success('Logged In Successfull',{
                    toastId : 'login-google'
                });
                setLoading(false);

                const data = {
                    name : res.user.displayName ,
                    photoURL : res.user.photoURL,
                    email : res.user.email ,
                    role : 'user'

                }

                try {

                    const res =  axiosSecure.post('/createUser',data);
                    if(res.data?.insertedId)
                        console.log('User inserted into DB') ;
                } catch (error) {
                    console.log(error);
                }

                console.log(res);
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => {
                toast.error('Logged in failed')
                console.log(error);
            })
    }

    const handleSigninWithEmail = (data) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                toast.success('Logged In SuccesFull',
                    {
                        toastId: 'LogIn Success'
                    });
                setLoading(false);

                const data = {
                    name : res.user.displayName ,
                    photoURL : res.user.photoURL,
                    email : res.user.email ,
                    role : 'user'

                }

                try {

                    const res =  axiosSecure.post('/createUser',data);
                    if(res.data?.insertedId)
                        console.log('User inserted into DB') ;
                } catch (error) {
                    console.log(error);
                }

                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => {
                console.log(error);
                toast.error('Logged in fail')
            })
    }

    const handleForgot = (e)=> {
        e.preventDefault()
            navigate('/resetPassword')
    }

    return (
        <div>
            
            {/* <Helmet>
                <title>Log In</title>
            </Helmet> */}

            <div className="hero bg-base-200 min-h-screen sora-font dark:bg-gray-800 dark:text-gray-200">
                <div className="hero-content flex-col gap-10 lg:flex-row my-12">
                    <div className="text-center lg:text-left">

                        <div className='logo flex items-center gap-1 justify-center lg:justify-start'>
                            <img className='w-12 lg:w-20' src={ darkMode ? whiteLogo : blackLogo} alt="" />
                            <p className='text-4xl lg:text-6xl poppins'>
                                <span className='font-bold '>RecipeHut</span>
                            </p>
                        </div>
                        <h1 className="text-lg lg:text-2xl font-medium sora-font my-5">RecipeHut helps you connect and share  food items with the people </h1>

                    </div>
                    <div className="card  w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-700">
                        <div className="card-body">

                            <form onSubmit={handleSubmit(handleSigninWithEmail)} className="fieldset ">

                                <FormInput label='Email' type='email' name='email' register={register} errors={errors} placeholder='Enter Your Email'/>

                                <FormInput label='Password' type='password' name='password' register={register} errors={errors} placeholder='Enter Your Password'/>

                                <div><a onClick={handleForgot} className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>

                                <div onClick={handleGoogleSignin} className="btn btn-outline mt-1">
                                    <span><FcGoogle size={20} /></span> <span>SignIn with Google</span>
                                </div>

                                <div className='divider'>OR</div>

                                <div className='text-center  font-medium'>
                                    
                                    <p className=''>Dont Have an account? <Link to={'/signup'} className='link text-[#23BE0A]'> Create </Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;