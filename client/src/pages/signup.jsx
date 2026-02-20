import react, { useContext, useState } from 'react'
import Navbar from '../components/navbar';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Appcontent } from '../context/appContent';

const SignUp = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    console.log(backend_url)
    const { backenUrl,isLoggedin,setIsLoggedin,userData, setUserData } = useContext(Appcontent);

    console.log(isLoggedin,backenUrl)

    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        try {

            if (password !== confirmPassword) {
                alert('please check password!!')
                return
            }
            const { data } = await axios.post(backend_url + 'auth/login', { email, password })

            console.log(data);

            if (data.success) {
                localStorage.setItem('token',data.token);
                setUserData(true)
                setIsLoggedin(true)
                toast.success('login successfully')
                navigate('/');
            } else {
                toast.error(data.message);
            }

        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mb-4" style={{ marginTop: "-14px" }}>
                <div className="w-full max-w-md p-6 bg-teal-100 rounded-lg shadow-2xl">
                    <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                id="confirmPassword"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}


export default SignUp;