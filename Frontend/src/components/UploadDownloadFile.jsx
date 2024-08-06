import { useState, useRef } from 'react';
import { uploadFile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import TopBar from './Topbar';
import Footer from './Footer';

const UploadDownloadFile = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const onUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        setLoading(true);  // Show loader
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadFile(formData);
            setResult(response.path);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);  // Hide loader
        }
    };

    const handleDownloadClick = () => {
        if (result) {
            const link = document.createElement('a');
            link.href = result;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Debug logging
            console.log("Download initiated, navigating to upload...");

            // Redirect to upload page after download
            navigate('/upload');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-100 p-4">
                <button
                    onClick={onUploadClick}
                    className="bg-[#605D3A] hover:bg-[#323010] text-white font-bold py-2 px-4 rounded-md mb-4"
                >Upload File</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {file && (<p className="mb-4">Selected file: {file.name}</p>)}
                <button
                    onClick={handleUpload}
                    className="bg-[#37896C] hover:bg-[#006D5F] text-white font-bold py-2 px-4 rounded-md"
                >Submit</button>
                {loading && (
                    <div className="mt-4"><span className="loading loading-bars loading-lg bg-purple-700"></span></div>
                )}
                {result && (
                    <div className="text-center mt-8">
                        <p className="text-2xl font-bold mb-4">File uploaded successfully!</p>
                        <button
                            onClick={handleDownloadClick}
                            className="bg-[#E79B42] hover:bg-[#966F48] text-white font-bold py-2 px-4 rounded-md"
                        >Download</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default UploadDownloadFile;
