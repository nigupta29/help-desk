import { productsSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getProductsAPI = async () => {
  const res = await axiosInstance.get("/products")
  return productsSchema.parseAsync(res.data.data.products)
}

export default function useProducts() {
  const {
    data: products = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAPI,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000
  })

  if (error) {
    showErrorMessage(error)
  }

  return { products, isLoading }
}
