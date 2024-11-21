import ProductService from "../services/productService.js";
import UserService from "../services/userService.js";

class ProductController {
  productService = new ProductService();
  userService = new UserService();

  // Create a new product
  createProduct = async (req, res) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message});
    }
  };

  // Get all products
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).send({ success: true, message: products });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Get a product by ID
  getProductById = async (req, res) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({ success: false,message: error.message });
    }
  };

  // Update a product by ID
  updateProduct = async (req, res) => {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  // Delete a product by ID
  deleteProduct = async (req, res) => {
    try {
      const product = await this.productService.deleteProduct(req.params.id);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getBestSellingProduct = async (req, res) => {
    try {
      const product = await this.productService.getBestSellingProduct();
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getLeastSellingProduct = async (req, res) => {
    try {
      const product = await this.productService.getLeastSellingProduct();
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

}

export default ProductController;