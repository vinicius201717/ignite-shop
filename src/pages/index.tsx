import { HomeContainer, Product } from '@/styles/pages/home'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'

interface HomeProps {
  products: Array<{ id: string; name: string; imageUrl: string; price: string }>
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  return (
    <>
      <NextSeo
        title="Ignite Shop"
        description="Todos os produtos da Ignite Shop"
      />
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                placeholder="blur"
                blurDataURL={'../assets/desfoque.jpeg'}
                alt={''}
              />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price | null

    if (price && typeof price.unit_amount === 'number') {
      const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100)

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formattedPrice,
      }
    } else {
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: 'Preço não disponível',
      }
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 1,
  }
}
