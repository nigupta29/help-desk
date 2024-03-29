import Loader from "@/components/layouts/loader"
import { SelectItem } from "@/components/ui/select"
import useProducts from "@/hooks/product/use-products"

export default function ProductSelectItems() {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return <Loader label="Fetching products" />
  }

  return (
    <>
      {products.map((item) => (
        <SelectItem key={item.name} value={item.id}>
          {item.name}
        </SelectItem>
      ))}
    </>
  )
}
