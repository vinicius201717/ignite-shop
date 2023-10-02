import { HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import { ShoppingBag } from 'phosphor-react'
import { useContext } from 'react'
import { ShoppingContext } from '@/context/context'
import Link from 'next/link'
import { handleAddShoppingBag } from '@/utils/shoppingAdd'
import { formatPrice } from '@/utils/formatPrice'

interface HomeProps {
  products: Array<{
    id: string
    name: string
    imageUrl: string
    price: number
    quantity: number
  }>
}

export default function Home({ products }: HomeProps) {
  const shopping = useContext(ShoppingContext)

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
          <Link href={`/product/${product.id}`} key={product.id}>
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
                <div>
                  <strong>{product.name}</strong>
                  <br />
                  <span>{formatPrice(product.price)}</span>
                </div>
                <ShoppingBag
                  onClick={(e) => {
                    e.preventDefault()
                    shopping && handleAddShoppingBag(product, shopping)
                  }}
                />
              </footer>
            </Product>{' '}
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
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        defaultPriceId: price.id,
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
