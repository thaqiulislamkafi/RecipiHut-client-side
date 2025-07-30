import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user,loading } = use(AuthContext);
    const location = useLocation();
    if(loading)
        return <Loading></Loading>

    if (user)
        return children;

    return <Navigate state={location.pathname} to={'/signin'}></Navigate>
};

export default PrivateRoute;

export const Loading = () => {
    return (
        <div>
            <div className='min-h-screen flex justify-center items-center'>
                <span className="loading loading-bars loading-xl"></span>
            </div>
        </div>
    );
};
