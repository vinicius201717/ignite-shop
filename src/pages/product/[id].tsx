import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'

export default function Product({ product }: any) {
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          impedit veritatis ratione nobis adipisci modi placeat? Modi minus
          blanditiis culpa{' '}
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        nama: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        product: product.description,
      },
    },
    revalidate: 60 * 60 * 1,
  }
}
