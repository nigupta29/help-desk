import { useMemo } from "react"
import useProducts from "./use-products"

export default function useProductDetails(productId: string) {
  const { products } = useProducts()
  const productName = useMemo(() => {
    return products.find((item) => item.id === productId)?.name
  }, [products, productId])

  return { productName }
}
