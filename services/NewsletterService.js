import { NewsletterSubscription } from '../models/index.js';

class NewsletterService {
  subscribe = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const [subscription, created] = await NewsletterSubscription.findOrCreate({
      where: { email: normalizedEmail },
      defaults: { email: normalizedEmail }
    });

    if (!created) {
      throw new Error('El email ya está suscripto');
    }

    return subscription;
  };
}

export default NewsletterService;
