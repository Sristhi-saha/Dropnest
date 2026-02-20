import { createContext, useState } from "react";

export const Appcontent = createContext();

export const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

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