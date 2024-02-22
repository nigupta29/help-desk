import { TableCell, TableRow } from "@/components/ui/table"
import useProducts from "@/hooks/product/use-products"
import { TicketSchemaType } from "@/lib/types"
import { useMemo } from "react"

type Props = {
  ticket: TicketSchemaType
}

export default function TicketTableRow({ ticket }: Props) {
  const { products } = useProducts()

  const product = useMemo(() => {
    return products.find((item) => item.id === ticket.productId)?.name
  }, [products, ticket.productId])

  return (
    <TableRow key={ticket.id}>
      <TableCell>{ticket.title}</TableCell>
      <TableCell>{product}</TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>{ticket.priority}</TableCell>
      <TableCell className="text-right">{ticket.updatedAt}</TableCell>
    </TableRow>
  )
}
