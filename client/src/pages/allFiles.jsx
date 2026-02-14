import react from 'react'
import Navbar from '../components/navbar.jsx'
import { useState } from 'react';

const AllFiles = ()=>{
    const [files, setFiles] = useState([]);


    return (
        <>
            <Navbar />
                <div className="p-10">
                    <h3 className="text-4xl font-semibold text-teal-600 mb-2 text-center">
                        All Uploaded Files
                    </h3>   
                    <p className="text-2xl text-slate-600 text-center">
                        Browse and manage all your uploaded files in one place.
                    </p>

                    <div className="mt-6">
                        {files.length > 0 ? (
                            <ul className="space-y-4">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <span className="text-gray-800">{file.name}</span>
                                        <div className="flex gap-2">
                                            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold cursor-pointer">
                                                Download
                                            </button>
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold cursor-pointer">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center">No files uploaded yet.</p>
                        )}
                    </div>
                </div>  
        </>
    )
}

export default AllFiles;