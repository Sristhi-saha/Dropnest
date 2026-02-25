import react, { useContext } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Appcontent } from '../context/appContent';
import axios from 'axios';

const Navbar = ()=>{
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const {isLoggedin,userData,
        setIsLoggedin,
        setUserData} = useContext(Appcontent)
    console.log(isLoggedin,userData);
    const logout = async()=>{
        try{
            axios.defaults.withCredentials=true;
            const {data} = await axios.post(backend_url+'auth/logout');
            localStorage.removeItem("token");
            console.log(data);
            setIsLoggedin(false);
        }catch(e){
            toast.error(e.message)
        }
    }
    const navigate = useNavigate()
    return (
        <>
            <nav className='flex justify-between items-center' style={{"marginTop":"-18px"}}>
                <div className="logo">
                    <img src="/logoo.png" alt="" height="100" width="140" className='rounded-full' onClick={()=>navigate('/')} />
                </div>
                <div className="flex gap-4 p-4 cursor-pointer items-center">
                     <Link to='/' className='font-bold text-gray-700 hover:text-gray-500'>Home</Link>
                    {isLoggedin?<Link to='/upload' className="font-bold text-gray-700 hover:text-gray-500">Upload</Link>:<span className='font-bold text-gray-400 cursor-not-allowed pointer-events-none'> Upload</span>}
                    {isLoggedin?<Link to='/allfiles' className="font-bold text-gray-700 hover:text-gray-500">All Files</Link>:<span className='font-bold text-gray-400 cursor-not-allowed pointer-events-none'> All Files</span>}
                    {isLoggedin?<Link onClick={logout} className='border border-gray-700 rounded-4xl px-6 py-1 cursor-pointer'>Logout</Link>:<Link to='/login' className='border border-gray-700 rounded-4xl px-6 py-1 cursor-pointer'>Login</Link>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;