import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  ImageContainer,
  ProductShoppingContainer,
  SidebarContainer,
  FooterContainer,
  ProductsContainer,
} from './styled'
import { X } from 'phosphor-react'
import { ShoppingContext } from '@/context/context'
import Image from 'next/image'
import { formatPrice } from '@/utils/formatPrice'
import { handleRemoveItem } from '@/utils/shoppingRemove'

export interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    quantity: number
    description: string
    defaultPriceId: string
  }
}

export function Sidebar({ open, setOpen }: any) {
  const shopping = useContext(ShoppingContext)

  const [quantityItem, setItem] = useState(0)
  const [totalValue, setValue] = useState(0)

  function handleClosedSidebarShopping() {
    setOpen(false)
  }

  useEffect(() => {
    setItem(0)
    setValue(0)
    if (shopping?.products && shopping?.products[0]?.price) {
      shopping?.products.forEach((product) => {
        setItem((prevItem) => prevItem + product.quantity)
        if (product.price !== null) {
          setValue(
            (current) => current + (product.price * product.quantity || 0),
          )
        }
      })
    }
  }, [shopping?.products])

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        shopping: shopping?.products,
      })
      const { checkoutUrl } = response.data
      console.log(checkoutUrl)

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <SidebarContainer className={open ? '' : 'closed'}>
      <X onClick={handleClosedSidebarShopping} />
      <h1>Sacola de compras</h1>
      <ProductsContainer>
        {shopping?.products ? (
          shopping.products.map((product) => {
            return (
              <ProductShoppingContainer key={product.id}>
                <ImageContainer>
                  <Image
                    src={product.imageUrl}
                    width={100}
                    height={100}
                    alt=""
                  />
                </ImageContainer>
                <div>
                  <h2>{product.name}</h2>
                  <span>{formatPrice(product.price)}</span>
                  {`${product.quantity}x`}
                  <button onClick={() => handleRemoveItem(shopping, product)}>
                    Remover
                  </button>
                </div>
              </ProductShoppingContainer>
            )
          })
        ) : (
          <h1>Nenhum produto no carrinho1</h1>
        )}
      </ProductsContainer>
      <FooterContainer>
        <div>
          <p>Quantidade</p>
          <p>{quantityItem} items</p>
        </div>
        <div>
          <h4>Valor total</h4>
          <h4>{formatPrice(totalValue)}</h4>
        </div>
        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
          Finalizar Compra
        </button>
      </FooterContainer>
    </SidebarContainer>
  )
}
