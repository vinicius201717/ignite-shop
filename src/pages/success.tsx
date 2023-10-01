import { stripe } from '@/lib/stripe'
import { SuccessContainer, ImageContainer } from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <NextSeo
        title={product.name}
        description="Compra realizada com sucesso!"
      />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>
        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálago</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(String(sessionId), {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    // Verificar se customer_details está presente e tem uma propriedade de nome
    const customerName =
      session.customer_details?.name || 'Nome do Cliente Desconhecido'

    const lineItems = session.line_items?.data

    if (!lineItems || lineItems.length === 0) {
      throw new Error('No line items found in the session.')
    }

    // Access the product information from the first line item
    const product = lineItems[0].price?.product as Stripe.Product

    return {
      props: {
        customerName,
        product: {
          name: product?.name || 'Nome do Produto Indisponível',
          imageUrl: product?.images[0] || '',
        },
      },
    }
  } catch (error) {
    // Lide com erros de consulta da sessão do Stripe aqui
    console.error('Erro ao recuperar a sessão do Stripe:', error)

    return {
      props: {
        customerName: 'Nome do Cliente Indisponível',
        product: {
          name: 'Produto Indisponível',
          imageUrl: '',
        },
      },
    }
  }
}
