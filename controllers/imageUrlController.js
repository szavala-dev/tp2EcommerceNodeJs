import ImageUrlService from "../services/imageUrlService.js";

class ImageUrlController {
  imageUrlService = new ImageUrlService();

  // Crear una nueva URL de imagen
  createImageUrl = async (req, res) => {
    try {
      const imageUrl = await this.imageUrlService.createImageUrl(req.body);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Obtener todas las URLs de imagen
  getAllImageUrls = async (req, res) => {
    try {
      const imageUrls = await this.imageUrlService.getAllImageUrls();
      res.status(200).send({ success: true, message: imageUrls });
    } catch (error) {
      res.status(400).send({success: false, message: error.message });
    }
  };

  // Obtener una URL de imagen por ID
  getImageUrlById = async (req, res) => {
    try {
      const imageUrl = await this.imageUrlService.getImageUrlById(req.params.id);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Actualizar una URL de imagen por ID
  updateImageUrl = async (req, res) => {
    try {
      const imageUrl = await this.imageUrlService.updateImageUrl(req.params.id, req.body);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Eliminar una URL de imagen por ID
  deleteImageUrl = async (req, res) => {
    try {
      const imageUrl = await this.imageUrlService.deleteImageUrl(req.params.id);
      res.status(200).send({ success: true, message: imageUrl });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default ImageUrlController;