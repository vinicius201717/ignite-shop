import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripeSecretKey: string | undefined = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error(
    'A chave secreta do Stripe não foi encontrada no arquivo .env',
  )
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-08-16',
  appInfo: {
    name: 'Ignite Shop',
  },
})
