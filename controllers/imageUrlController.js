import ImageUrlService from "../services/imageUrlService.js";
import { validateRequiredFields } from "../utils/validators.js";

class ImageUrlController {
  imageUrlService = new ImageUrlService();

  // Crear una nueva URL de imagen
  createImageUrl = async (req, res) => {
    try {
      const { valid, missing } = validateRequiredFields(req.body, ['ProductId', 'URL']);
      if (!valid) {
        return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
      }
      const imageUrl = await this.imageUrlService.create(req.body);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener todas las URLs de imagen
  getAllImageUrls = async (req, res) => {
    try {
      const imageUrls = await this.imageUrlService.findAll();
      res.status(200).send({ success: true, message: imageUrls });
    } catch (error) {
      res.status(400).send({success: false, message: error.message });
    }
  };

  // Obtener una URL de imagen por ID
  getImageUrlById = async (req, res) => {
    try {
      const imageUrl = await this.imageUrlService.findById(req.params.id);
      if (!imageUrl) {
        return res.status(404).send({ success: false, message: "Image URL not found" });
      }
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Actualizar una URL de imagen por ID
  updateImageUrl = async (req, res) => {
    try {
      if ('ProductId' in req.body || 'URL' in req.body) {
        const fields = [];
        if ('ProductId' in req.body) fields.push('ProductId');
        if ('URL' in req.body) fields.push('URL');
        const { valid, missing } = validateRequiredFields(req.body, fields);
        if (!valid) {
          return res.status(400).send({ success: false, message: `Missing fields: ${missing.join(', ')}` });
        }
      }
      const imageUrl = await this.imageUrlService.update(req.params.id, req.body);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Eliminar una URL de imagen por ID
  deleteImageUrl = async (req, res) => {
    try {
      const imageUrl = await this.imageUrlService.delete(req.params.id);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default ImageUrlController;