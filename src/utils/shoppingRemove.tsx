export function handleRemoveItem(shopping: any, product: any) {
  const updatedItems = shopping.products
    .map((item: any) => {
      if (item.id === product.id) {
        if (item.quantity === 1) {
          return null
        } else {
          return { ...item, quantity: item.quantity - 1 }
        }
      }
      return item
    })
    .filter((item: any) => item !== null)

  shopping.setProducts(updatedItems)
}
