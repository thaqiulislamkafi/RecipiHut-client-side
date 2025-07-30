import React, { use } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase/Authentication';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {

    const { emailValue, darkMode } = use(AuthContext);
    console.log(typeof (emailValue))
    const isGmail = emailValue?.includes("gmail.com");

    const blackLogo = 'https://i.postimg.cc/R0FMxb5w/Black-logo.png';
    const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png';


    const handleReset = (e) => {
        e.preventDefault();

        sendPasswordResetEmail(auth, emailValue)
            .then(res => {
                toast.success('Password Reset Link Send');
                console.log(res);
                if (isGmail)
                    window.open('https://mail.google.com', '_blank')
            })
            .catch(error => {
                toast.error(error);
            })
    }
    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className="hero bg-base-200 min-h-screen sora-font dark:bg-gray-700">
                <div className="hero-content flex-col gap-10 lg:flex-row my-12">
                    <div className="text-center lg:text-left">

                        <div className='logo flex items-center gap-1 justify-center lg:justify-start'>
                            <img className='w-12 lg:w-20' src= {darkMode ? whiteLogo : blackLogo} alt="" />
                            <p className='text-4xl lg:text-6xl poppins'>
                                <span className='font-bold'>RecipeHut</span>
                            </p>
                        </div>
                        <h1 className="text-lg lg:text-2xl font-medium sora-font my-5">Eventure helps you connect and share event with the people in your life</h1>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-700">
                        <div className="card-body">
                            <p className='text-base text-center font-medium'>Reset Password</p>
                            <div className='border-t-2 border-dashed border-gray-200 my-3'></div>
                            <form className="fieldset ">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input dark:bg-gray-700" value={emailValue} placeholder="Email" />
                                <button onClick={handleReset} className="btn mt-4 ">Reset </button>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;