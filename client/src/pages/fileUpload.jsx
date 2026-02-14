import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { Upload } from "lucide-react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

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
          <input
            type="file"
            id="fileInput"
            className="hidden"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />

          <label
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            htmlFor="fileInput"
            className={`border-dashed border-4 p-10 mt-4 rounded-lg text-center block cursor-pointer hover:bg-gray-50 ${
              dragActive ? "border-teal-600 bg-teal-50" : "border-gray-400"
            }`}
          >
            {files.length > 0 ? (
              <div className="flex justify-center items-center flex-col gap-4">
                <Upload className="w-12 h-12 text-teal-600" />
                <p className="text-teal-600 font-semibold text-2xl">
                  {files.length > 1
                    ? `${files.length} files selected`
                    : files[0].name}
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col gap-4">
                <Upload className="w-12 h-12 mx-auto" />
                <p className="text-gray-600">
                  Drag and drop your files here or click to select
                </p>
              </div>
            )}
            {files.length > 0 && (
            <button
              className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors text-2xl font-semibold cursor-pointer"
              onClick={() => alert("Upload functionality not implemented yet")}
            >
              Upload File
            </button>
          )}
          </label>
          
        </div>
      </div>
    </>
  );
};

export default FileUpload;
