import { ShoppingContextType } from '@/context/context'

export interface ProductShoppingInterface {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}

export function handleAddShoppingBag(
  product: ProductShoppingInterface,
  shopping: ShoppingContextType,
) {
  const newProduct = { ...product, quantity: 1 }

  if (shopping) {
    const existingProductIndex = shopping.products.findIndex(
      (item) => item.id === newProduct.id,
    )

    if (existingProductIndex !== -1) {
      shopping.setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts]
        updatedProducts[existingProductIndex].quantity += 1
        return updatedProducts
      })
    } else {
      shopping.setProducts((prevProducts) => [...prevProducts, newProduct])
    }
  }
}
