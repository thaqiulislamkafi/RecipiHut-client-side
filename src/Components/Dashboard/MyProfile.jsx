import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyProfile = () => {

    const {user} = use(AuthContext) ;

    return (

        <div className=''>
            <div className='p-3 bg-gray-50 w-fit rounded-xl'>
                <img className='rounded-xl w-30' src={user?.photoURL} alt="" />
            </div>
            <p className='text-gray-800 font-bold text-lg'>Name</p>
        </div>
    );
};

export default MyProfile;