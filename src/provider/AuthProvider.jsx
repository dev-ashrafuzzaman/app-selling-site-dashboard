import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import axios from "axios";

import firebaseAppp from "../firebase/firebase.config";
import { serverURL } from "../hooks/useAxiousSecure";

export const AuthContext = createContext(null);
const auth = getAuth(firebaseAppp);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(user);

    // Social Login with Google
    const googleSigninUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //  Create User Auth with gmail and pass
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Login User with email and pass
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // LogOut user auth
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // update Profile
    const updateProfileUser = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current User', currentUser);
           


            // get and set tocken
            if (currentUser) {
                axios.post(`${serverURL}/jwt`, { email: currentUser.email })
                    .then(data => {
                        // console.log(data.data.token)
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);
                    })
            } else {
                localStorage.removeItem('access-token')
            }

        });

        return () => {
            return unsubscribe();
        }
    }, [])

    const authDetails = {
        user,
        loading,
        googleSigninUser,
        createUser,
        loginUser,
        logoutUser,
        updateProfileUser
    }


    return (
        <AuthContext.Provider value={authDetails}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
