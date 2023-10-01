import { stripe } from '@/lib/stripe'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useContext, useState } from 'react'
import { handleAddShoppingBag } from '@/utils/shoppingAdd'
import { ShoppingContext } from '@/context/context'
import { formatPrice } from '@/utils/formatPrice'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    quantity: number
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const shopping = useContext(ShoppingContext)
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }
  return (
    <>
      <NextSeo title={product.name} />
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatPrice(product.price)}</span>
          <p>{product.description} </p>
          <button
            onClick={() => shopping && handleAddShoppingBag(product, shopping)}
          >
            Adicionar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id || ''

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    if (price.unit_amount) {
      return {
        props: {
          product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: price.unit_amount,
            description: product.description,
            defaultPriceId: price.id,
          },
        },
        revalidate: 60 * 60 * 1,
      }
    }

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: 'Preço não disponível',
          description: product.description,
        },
      },
      revalidate: 60 * 60 * 1,
    }
  } catch (error) {
    console.error('Erro ao recuperar o produto:', error)
    return {
      notFound: true,
    }
  }
}
