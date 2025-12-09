import { Router } from 'express';
import UploadController from '../controllers/UploadController.js';
import upload from '../middlewares/upload.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';

const router = Router();
const uploadController = new UploadController();
const singleUpload = upload.single('file');

router.post('/', authenticate, requireAdmin, (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ success: false, message: err.message });
    }
    return uploadController.uploadSingle(req, res);
  });
});

export default router;
