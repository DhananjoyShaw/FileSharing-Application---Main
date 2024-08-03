import express from 'express';
import upload from '../utils/upload.js';
import { uploadImage, downloadImage, getUserFiles } from '../controllers/imageController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.get('/user-files', authenticate, getUserFiles);

export default router;
