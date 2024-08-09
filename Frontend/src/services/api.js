import axios from 'axios';
import { URL } from '../url.js';

export const uploadFile = async (formData) => {
    try {
        const response = await axios.post(`${URL}/api/v1/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to upload file');
    }
};

export const downloadFile = async (fileId) => {
    try {
        const response = await axios.get(`${URL}/api/v1/file/${fileId}`, {
            responseType: 'blob',
            withCredentials: true,
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        throw new Error('Failed to download file');
    }
};