import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import logoIgnite from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import { ShoppingBag } from 'phosphor-react'

import Image from 'next/image'
import Context from '@/context/context'
import { Sidebar } from '@/components/Sidebar'
import { useState } from 'react'

globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false)
  function handleOpenSidebarShopping() {
    setOpen(true)
  }

  return (
    <Context>
      <Container>
        <Header>
          <Image src={logoIgnite} alt="" />
          <ShoppingBag onClick={handleOpenSidebarShopping} />
        </Header>
        <Sidebar open={open} setOpen={setOpen} />
        <Component {...pageProps} />
      </Container>
    </Context>
  )
}
