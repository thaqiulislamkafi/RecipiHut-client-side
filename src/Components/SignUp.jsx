import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { use, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router';
import { auth } from './Firebase/Authentication';
import { AuthContext } from './Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaUserCircle } from "react-icons/fa";
import { IoIosCloudUpload, IoMdEyeOff } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { FormInput } from './AddRecipe';
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosSecure from './Hooks/useAxios';
// import { Helmet } from 'react-helmet-async';

const SignUp = () => {

    const googleProvider = new GoogleAuthProvider();
    const { user, setLoading, setUser } = use(AuthContext);
    // const [close, setClose] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [image,setImage] = useState() ;
    const [imageUploading,setImageUploading] = useState(false) ;

    const { darkMode } = use(AuthContext);
    const blackLogo = 'https://i.postimg.cc/R0FMxb5w/Black-logo.png';
    const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png';

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    const { register, handleSubmit, formState: { errors } } = useForm();

    // const handleToogle = () => {
    //     setClose(!close);
    // }

    const handleImageChange = async(e) => {
        e.preventDefault();
        
        setImageUploading(true);
        const formData = new FormData() ;
        formData.append('image',e.target.files[0]) ;

        try {
            const response = await axios.post( `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_REACT_APP_IMGBB_KEY}`,formData)
            setImage(response.data.data.url) ;
            setImageUploading(false) ;
            console.log(response.data.data.url)
        } catch (error) {
            console.error('Image Upload Failed:', error);
                Swal.fire('Error', 'Image upload failed. Try again.', 'error');
        }
    }

    const handleGoogleSignIn = () => {

        signInWithPopup(auth, googleProvider)
            .then(async(res) => {
                toast.success('Signed in successfully', {
                    toastId: 'User'
                });
                setLoading(false);

                const data = {
                    name : res.user.displayName ,
                    photoURL : res.user.photoURL,
                    email : res.user.email ,
                    role : 'user'
                }

                try {

                    const res = await axiosSecure.post('/createUser',data);
                    if(res.data?.insertedId)
                        console.log('User inserted into DB') ;
                } catch (error) {
                    console.log(error);
                }
                
            })
            .catch(error => {
                toast.error('Signed in Failed')
                console.error(error);
            })
    }

    const handleSignUpWithEmail = (data) => {


        if (passwordRegex.test(data.password) === false) {
            toast.error('Password have must at least Uppercase,Lower case and more than 6 letters');
            return;
        }

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async(res) => {
                toast.success('Account Created Successfully');
                console.log(res);
                setUser({ ...user, email: data.email, displayName: data.name, photoURL: image });

                updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: image
                })

                try {
                    data.role = 'user' ;
                    data.photoURL = image ; 
                    const  res = await axiosSecure.post('/createUser',data);
                    if(res.data?.insertedId)
                        console.log('User inserted into DB') ;
                } catch (error) {
                    console.log(error);
                }

                setLoading(false);
                navigate(`${location.state ? location.state : '/'}`);


            })
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
                            <img className='w-12 lg:w-20' src={darkMode ? whiteLogo : blackLogo} alt="" />
                            <p className='text-4xl lg:text-6xl poppins'>
                                <span className='font-bold '>RecipeHut</span>
                            </p>
                        </div>
                        <h1 className="text-lg lg:text-2xl font-medium sora-font my-5">RecipeHut helps you connect and share  food items with the people </h1>

                    </div>
                    <div className="card  w-full max-w-md shrink-0 shadow-2xl dark:bg-gray-700">
                        <div className="card-body">

                            <form onSubmit={handleSubmit(handleSignUpWithEmail)} className="fieldset ">

                                <div className='my-2'>

                                    {image ? <div className='border mb-2 w-12 rounded-full min-h-12'>
                                    <img className='w-12 rounded-full' src={image} alt="" />
                                    </div> :
                                    
                                    <div className='mb-2'><FaUserCircle size={50} /></div> }
                                    

                                    <label>
                                        <input type="file" accept='image/' className='hidden' onChange={handleImageChange} />
                                        <div className='btn btn-xs'><IoIosCloudUpload />{imageUploading ? 'Uploading..' :image ? 'Change Image': 'Upload Image'}</div>
                                    </label>
                                </div>

                                <FormInput label='Name' type='text' name='name' register={register} errors={errors} placeholder='Enter Your Name' />

                                <FormInput label='Email' type='email' name='email' register={register} errors={errors} placeholder='Enter Your Email' />

                                <FormInput label='Password' type='password' name='password' register={register} errors={errors} placeholder='Enter Your Password' />

                                <button className="btn btn-neutral mt-4">Signup</button>

                                <div onClick={handleGoogleSignIn} className="btn btn-outline mt-1">
                                    <span><FcGoogle size={20} /></span> <span>SignUp with Google</span>
                                </div>

                                <div className='divider'>OR</div>

                                <div className='text-center  font-medium'>

                                    <p className=''>Already have an account? <Link to={'/login'} className='link text-[#23BE0A]'> Sign In </Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;