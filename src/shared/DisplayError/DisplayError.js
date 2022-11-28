import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {

            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <p className='text-red'>Something is wrong!</p>
            <p className='text-red-400 '>{error.statusText || error.message}</p>
            <h4 className='text-3xl'>Please <button onClick={handleLogOut}
                className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
            >
                Log Out
            </button></h4>
        </div>
    );
};

export default DisplayError;