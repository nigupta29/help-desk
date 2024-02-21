import { ProductsSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getProductsAPI = async () => {
  const res = await axiosInstance.get("/products")
  return ProductsSchema.parseAsync(res.data.data.products)
}

export default function useProducts() {
  const {
    data: products = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAPI
  })

  if (error) {
    showErrorMessage
  }

  return { products, isLoading }
}
