import File from '../models/fileModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
        user: request.user._id
    };

    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `http://localhost:${process.env.PORT}/api/v1/file/${file._id}` });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);

        if (!file) {
            return response.status(404).json({ message: "File not found" });
        }

        file.downloadCount++;
        await file.save();
        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
};

export const getUserFiles = async (req, res) => {
    try {
        const files = await File.find({ user: req.user._id });
        res.status(200).json(files);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};