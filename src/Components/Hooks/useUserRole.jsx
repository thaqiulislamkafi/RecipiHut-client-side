import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from './useAxios';

const useUserRole = () => {

    const {user} = use(AuthContext) ;

    const {data : userRole} = useQuery({
        queryKey : ['userRole',user?.email],
        queryFn : async()=>{
            const {data} = await axiosSecure(`/getUserRole?email=${user?.email}`) ;
            return data ;
        },
        enabled : !! user?.email
    })
    console.log(userRole) ;
    return userRole?.role ;
};

export default useUserRole;