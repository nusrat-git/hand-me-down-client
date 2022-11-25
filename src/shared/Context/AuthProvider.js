import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import app from '../../firebase/Firebase.config'

export const AuthContext = createContext();

export const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const userRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('auth state chaged', user);
            setUser(currentUser);
        });
        return () => {
            return unsubscribe();
        }
    }, [user])

    const handleProfile = (profile) => { 
        return updateProfile(auth.currentUser, profile);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const authInfo = {
        userRegister,
        userLogIn,
        user,
        handleProfile,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;