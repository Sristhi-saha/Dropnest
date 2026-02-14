import React, { useState ,useEffect} from "react";
import Navbar from "../components/navbar.jsx";
import { Upload } from "lucide-react";

const FileUpload = () => {
    const [file, setFile] = useState([]);


    return (
        <>
            <Navbar />

            <div className="p-10">
                <h3 className="text-4xl font-semibold text-teal-600 mb-2 text-center">
                    Secure Cloud Storage
                </h3>

                <p className="text-2xl text-slate-600 text-center">
                    Your files are encrypted and stored safely.
                </p>

                <div className="p-4 mt-2 rounded-lg mx-10">

                    {/* Hidden Input */}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        multiple
                        onChange={(e) => setFile(e.target.files)}
                    />

                    {/* Clickable Upload Box */}
                    <label
                        htmlFor="fileInput"
                        className="border-dashed border-4 border-gray-400 p-10 mt-4 rounded-lg text-center cursor-pointer block hover:bg-gray-50"
                    >
                        {file ? (
                            <div className="flex justify-center items-center flex-col gap-4">
                                <Upload className="w-12 h-12 text-teal-600" />
                                <p className="text-teal-600 font-semibold text-2xl">
                                    File Selected: {file.name}
                                </p>
                                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-2xl font-semibold cursor-pointer">
                                    Upload File
                                </button>
                            </div>

                        ) : (
                            <p className="text-gray-600">
                                <Upload className="w-12 h-12 mx-auto" />
                                Drag and drop your files here or click to select
                            </p>
                        )}
                    </label>

                </div>
            </div>
        </>
    );
};

export default FileUpload;
