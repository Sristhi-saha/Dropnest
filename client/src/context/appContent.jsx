import { createContext, useEffect, useState } from "react";

export const Appcontent = createContext();

export const AppContextProvider = ({ children }) => {

    useEffect(()=>{
        const token = localStorage.getItem('token');
    },[])

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if(token){
            setIsLoggedin(true);
        }
    },[])

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData
    };

    return (
        <Appcontent.Provider value={value}>
            {children}
        </Appcontent.Provider>
    );
};