import Loader from "@/components/layouts/loader"
import { SelectItem } from "@/components/ui/select"
import useProducts from "@/hooks/product/use-products"

export default function ProductSelectItems() {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {products.map((item) => (
        <SelectItem value={item.id}>{item.name}</SelectItem>
      ))}
    </>
  )
}
