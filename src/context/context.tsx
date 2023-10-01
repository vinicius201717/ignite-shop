import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}

export type ShoppingContextType = {
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>
}

export const ShoppingContext = createContext<ShoppingContextType | null>(null)

function Context({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  return (
    <ShoppingContext.Provider value={{ products, setProducts }}>
      {children}
    </ShoppingContext.Provider>
  )
}

export default Context
