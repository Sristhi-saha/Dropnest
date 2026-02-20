import react, { useContext, useState } from 'react'
import Navbar from '../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Appcontent } from '../context/appContent';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

    const naviagte = useNavigate()

    const {isLoggedin,userData,
        setIsLoggedin,
        setUserData} = useContext(Appcontent);

    console.log(isLoggedin);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const backend_url=import.meta.env.VITE_BACKEND_URL;

    const onsubmitHandler = async(e)=>{
        e.preventDefault();
        axios.defaults.withCredentials=true;
        try{
            const {data} = await axios.post(backend_url + 'auth/login', { email, password })
            console.log(data);
            setIsLoggedin(true);
            naviagte('/')
        }catch(e){
            toast.error(e)
        }
    }


    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-4">
                <div className="w-full max-w-md p-8 bg-teal-100 rounded-lg shadow-2xl">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
                    <form onSubmit={onsubmitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                onChange={(e)=>setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                onChange={(e)=>setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                                placeholder="Enter your password"
                            />
                        </div>
                        <p className="text-center text-gray-600 p-2">
                            Forgot your password? <a href="#" className="text-teal-600 hover:underline">Reset it</a>
                        </p>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account? <Link to="/signup" className="text-teal-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;