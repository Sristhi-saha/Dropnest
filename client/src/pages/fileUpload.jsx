import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { Upload, File, X, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Appcontent } from "../context/appContent.jsx";
import { useContext ,useEffect} from "react";
import { useNavigate } from "react-router-dom";



const FileUpload = () => {

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { setIsLoggedin } = useContext(Appcontent);
  const navigate = useNavigate();
  
  useEffect(() => {
   const token = localStorage.getItem("token");
  if (!token) navigate('/');
  uploadFile()
}, [setIsLoggedin]);

  const uploadFile = async () => {
    if (!files || files.length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `https://dropnestwebapp.onrender.com/api/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        console.log(data)
        toast.success(data.message);
        setUploaded(true);
        setTimeout(() => {
          setFiles([]);
          setUploaded(false);
        }, 2000);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

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
      setUploaded(false);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles([]);
    setUploaded(false);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <>
      <style>{`
        

        .fu-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .fu-wrapper {
          max-width: 640px;
          margin: 0 auto;
          padding: 20px 24px;
        }

        .fu-heading {
          font-family: 'Syne', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #0d1b2a;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .fu-heading span {
          color: #0d9488;
        }

        .fu-sub {
          color: #64748b;
          font-size: 1rem;
          font-weight: 400;
          margin-bottom: 40px;
        }

        .fu-card {
          background: #CCFBF1;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .fu-dropzone {
          border: 2px dashed #cbd5e1;
          border-radius: 14px;
          padding: 48px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #f8fafc;
          display: block;
        }

        .fu-dropzone:hover {
          border-color: #0d9488;
          background: #f0fdfa;
        }

        .fu-dropzone.active {
          border-color: #0d9488;
          background: #f0fdfa;
          transform: scale(1.01);
        }

        .fu-dropzone.has-file {
          border-style: solid;
          border-color: #0d9488;
          background: #f0fdfa;
        }

        .fu-icon-wrap {
          width: 64px;
          height: 64px;
          background: #ccfbf1;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .fu-drop-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #0d1b2a;
          margin-bottom: 4px;
        }

        .fu-drop-sub {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .fu-drop-sub span {
          color: #0d9488;
          font-weight: 500;
        }

        .fu-file-info {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #f0fdfa;
          border: 1.5px solid #99f6e4;
          border-radius: 12px;
          padding: 14px 16px;
          margin-top: 20px;
          position: relative;
        }

        .fu-file-icon {
          width: 42px;
          height: 42px;
          background: #0d9488;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fu-file-name {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0d1b2a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 300px;
        }

        .fu-file-size {
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 2px;
        }

        .fu-remove {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s;
        }

        .fu-remove:hover {
          color: #ef4444;
        }

        .fu-btn {
          width: 100%;
          margin-top: 20px;
          padding: 15px;
          background: #0d9488;
          color: white;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.01em;
        }

        .fu-btn:hover:not(:disabled) {
          background: #0f766e;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(13,148,136,0.35);
        }

        .fu-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .fu-btn.success {
          background: #16a34a;
        }

        .fu-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .fu-hint {
          text-align: center;
          font-size: 0.78rem;
          color: #94a3b8;
          margin-top: 14px;
        }

        input[type="file"] { display: none; }
      `}</style>

      <Navbar />
<h1 className="fu-heading text-center">
    Secure <span>Cloud</span> Storage
  </h1>
  <p className="fu-sub text-center">Your files are encrypted and stored safely.</p>
      <div className="fu-root">
        
        <div className="fu-wrapper">
          
          <div className="fu-card">
            <input
              type="file"
              id="fileInput"
              multiple
              onChange={(e) => {
                setFiles(Array.from(e.target.files));
                setUploaded(false);
              }}
            />

            <label
              htmlFor="fileInput"
              className={`fu-dropzone ${dragActive ? "active" : ""} ${files.length > 0 ? "has-file" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="fu-icon-wrap">
                <Upload size={28} color="#0d9488" />
              </div>
              <p className=" text-3xl">
                {files.length > 0 ? "File ready to upload" : "Drop your file here"}
              </p>
              <p className="fu-drop-sub">
                {files.length > 0
                  ? "Click to choose a different file"
                  : <>or <span>browse</span> to choose a file</>}
              </p>
            </label>

            {files.length > 0 && (
              <div className="fu-file-info">
                <div className="fu-file-icon">
                  <File size={20} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="fu-file-name">{files[0].name}</div>
                  <div className="fu-file-size">{formatSize(files[0].size)}</div>
                </div>
                <button className="fu-remove" onClick={removeFile}>
                  <X size={16} />
                </button>
              </div>
            )}

            {files.length > 0 && (
              <button
                className={`fu-btn ${uploaded ? "success" : ""}`}
                onClick={uploadFile}
                disabled={uploading || uploaded}
              >
                {uploading ? (
                  <><div className="fu-spinner" /> Uploading...</>
                ) : uploaded ? (
                  <><CheckCircle size={18} /> Uploaded!</>
                ) : (
                  <><Upload size={18} /> Upload File</>
                )}
              </button>
            )}

            <p className="fu-hint">Max file size: 100MB · All file types supported</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;