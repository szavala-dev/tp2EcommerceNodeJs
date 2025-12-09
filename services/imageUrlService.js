import { ImageUrl } from "../models/index.js";
import BaseCrudService from "./BaseCrudService.js";

class ImageUrlService extends BaseCrudService {
  constructor() {
    super(ImageUrl);
  }
}

export default ImageUrlService;