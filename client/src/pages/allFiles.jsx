import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar.jsx'
import axios from 'axios';
import { Download, Trash2, FileText, FolderOpen } from 'lucide-react';

const AllFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const getAllFiles = async () => {
        try {
            const all = await axios.get('http://localhost:4000/api/fetch-all-files', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFiles(all.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = (url, fileName) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.target = '_blank';
        a.click();
    };

    const deleteFile = async (fileId) => {
        try {
            const data=await axios.delete(`http://localhost:4000/api/delete-file/${fileId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(data)
            setFiles(files.filter(f => f._id !== fileId));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllFiles();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="mb-10 text-center">
                        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-2">
                            All <span className="text-teal-600">Uploaded</span> Files
                        </h1>
                        <p className="text-gray-500 text-base">
                            Browse and manage all your uploaded files in one place.
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && files.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                                <FolderOpen size={32} className="text-teal-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">No files yet</h3>
                            <p className="text-gray-400 text-sm">Upload your first file to see it here.</p>
                        </div>
                    )}

                    {/* File list */}
                    {!loading && files.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Table header */}
                            <div className="grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100">
                                <span className="col-span-7 text-xs font-semibold text-gray-400 uppercase tracking-wider">File Name</span>
                                <span className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</span>
                            </div>

                            {/* File rows */}
                            <ul className="divide-y divide-gray-50">
                                {files.map((file) => (
                                    <li
                                        key={file._id}
                                        className="grid grid-cols-12 items-center px-5 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        {/* File info */}
                                        <div className="col-span-7 flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <FileText size={18} className="text-teal-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800 truncate">
                                                {file.fileName}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-5 flex items-center justify-end gap-2">
                                            
                                            <button
                                                onClick={() => deleteFile(file._id)}
                                                className="flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer count */}
                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-gray-400">
                                    {files.length} {files.length === 1 ? 'file' : 'files'} total
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllFiles;