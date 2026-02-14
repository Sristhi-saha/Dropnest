import react from 'react'
import Navbar from '../components/navbar';

const Login = () => {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-4">
                <div className="w-full max-w-md p-8 bg-teal-100 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
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
                        Don't have an account? <a href="#" className="text-teal-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;