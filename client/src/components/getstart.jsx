import react, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Appcontent } from '../context/appContent';

const GetStart = () => {
    const { setIsLoggedin } = useContext(Appcontent);
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center justify-center p-10">
                <h1 className=' flex items-center justify-center text-4xl font-bold'>Ready to Get Started?</h1>
                <p className="text-xl text-gray-600 text-center tracking-wider p-4">Your secure, simple, and elegant file management platform. Upload files with ease, organize them effortlessly, and share them instantly.</p>
                <div className="pt-4">
                    {setIsLoggedin ? (
                        <span className="bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold text-xl cursor-not-allowed opacity-60 inline-block">
                            Already Logged In
                        </span>
                    ) : (
                        <button
                            className="bg-teal-600 text-white px-8 py-3 hover:bg-teal-800 rounded-xl font-semibold text-xl"
                            onClick={() => navigate('/signup')}
                        >
                            Create Account Now
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default GetStart;
