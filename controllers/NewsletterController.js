import NewsletterService from '../services/NewsletterService.js';
import { validateRequiredFields } from '../utils/validators.js';

class NewsletterController {
  newsletterService = new NewsletterService();

  subscribe = async (req, res) => {
    try {
      const { valid, missing } = validateRequiredFields(req.body, ['email']);
      if (!valid) {
        return res.status(400).send({ success: false, message: `Faltan campos: ${missing.join(', ')}` });
      }

      const subscription = await this.newsletterService.subscribe(req.body.email);
      return res.status(201).send({ success: true, message: 'Suscripción registrada', data: subscription });
    } catch (error) {
      return res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default NewsletterController;
