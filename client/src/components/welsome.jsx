import react from 'react'
import { useContext } from 'react';
import { Appcontent } from '../context/appContent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Welcome = () => {

    const {setIsLoggedin} = useContext(Appcontent);
    const navigate = useNavigate();

    const handlebutton = ()=>{
        if(setIsLoggedin){
            navigate('/upload')
        }else{
            toast.error('login first!!')
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center p-10">
                <h1 className=' flex items-center justify-center text-6xl font-bold'>Welcome To  <span className='text-teal-600 pl-2'>  Dropnest</span></h1>
                <p className="text-xl text-gray-600 text-center tracking-wider p-4">Your secure, simple, and elegant file management platform. Upload files with ease, organize them effortlessly, and share them instantly.</p>
                <div className="pt-4">
                    <button onClick={()=>handlebutton()} className='bg-teal-600 text-white px-8 py-3 hover:bg-teal-800 rounded-2xl font-semibold text-xl'>Start Uploading Now</button>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
                        {/* Card 1 */}
                        <div className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h2 className='text-2xl font-bold mb-4 text-center text-gray-900'>Why Choose Dropnest?</h2>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Experience the future of file management with Dropnest. Our platform offers unparalleled security, lightning-fast uploads, and an intuitive interface that makes managing your files a breeze.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h2 className='text-2xl font-bold mb-4 text-center text-gray-900'>Easy to Use</h2>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Our intuitive interface makes uploading, organizing, and sharing files a breeze. No technical skills required – just upload and go!
                            </p>
                        </div>
                        <div className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h2 className='text-2xl font-bold mb-4 text-center text-gray-900'>Secure & Reliable</h2>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Your files are protected with industry-standard encryption and backed by a reliable infrastructure that ensures uptime and performance.
                            </p>
                        </div>
                        <div className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h2 className='text-2xl font-bold mb-4 text-center text-gray-900'>Fast & Efficient</h2>
                            <p className="text-gray-600 text-center leading-relaxed">
                                Upload and download files at lightning speed with our optimized infrastructure. No delays, no waiting – just fast, efficient file management.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome;