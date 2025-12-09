class UploadController {
  uploadSingle = (req, res) => {
    if (!req.file) {
      return res.status(400).send({ success: false, message: 'No se recibió ningún archivo' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(201).send({
      success: true,
      message: 'Archivo subido correctamente',
      data: {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  };
}

export default UploadController;
