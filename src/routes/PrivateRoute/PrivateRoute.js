import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../shared/Context/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    // if(loading){
    //     return <h1 className='text-2xl font-semibold'>Loading......</h1>
    // }

    if (!user) {
        return <Navigate to='/login'></Navigate>
    }

    return children;

};

export default PrivateRoute;