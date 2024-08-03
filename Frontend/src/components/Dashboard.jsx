import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../url.js';
import TopBar from './Topbar';
import Footer from './Footer';

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`${URL}/api/v1/user-files`, { withCredentials: true });
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files", error);
            }
        };
        fetchFiles();
    }, []);

    const handleUploadClick = () => {
        navigate('/upload');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex flex-1 flex-col items-center justify-center bg-[#edece3] p-4 md:p-10">
                <h2 className="text-3xl font-bold mb-8 text-black">Your Uploaded Files</h2>
                <button
                    onClick={handleUploadClick}
                    className="bg-[#37896C] hover:bg-[#006D5F] text-white font-bold py-2 px-4 rounded-md mb-4"
                >Upload a File</button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full max-w-7xl">
                    {files.map((file) => (
                        <div key={file._id} className="file-item flex flex-col justify-between items-center bg-[#e4b18a] p-4 rounded-xl shadow w-full h-24">
                            <span className="truncate w-full text-center text-black">{file.name}</span>
                            <a
                                href={`${URL}/api/v1/file/${file._id}`}
                                download
                                className="bg-[#E79B42] hover:bg-[#966F48] text-white font-bold py-1 px-3 rounded-xl mt-2"
                            >Download</a>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;
