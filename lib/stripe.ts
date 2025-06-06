import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
  appInfo: {
    name: 'Advancers.AI',
    version: '1.0.0',
  },
});
