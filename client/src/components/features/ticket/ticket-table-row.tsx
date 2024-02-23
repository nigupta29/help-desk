import { TableCell, TableRow } from "@/components/ui/table"
import useProductDetails from "@/hooks/product/use-product-details"
import { TicketSchemaType } from "@/lib/types"
import { getRelativeDate } from "@/lib/utils"
import { ArrowUpRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  ticket: TicketSchemaType
}

export default function TicketTableRow({ ticket }: Props) {
  const { productName } = useProductDetails(ticket.id)

  return (
    <TableRow key={ticket.id}>
      <TableCell>{ticket.title}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>{ticket.priority}</TableCell>
      <TableCell>{getRelativeDate(ticket.updatedAt)}</TableCell>
      <TableCell>
        <Link
          to={`${ticket.id}`}
          className="flex items-end underline hover:text-primary hover:decoration-primary"
        >
          <span>View</span>
          <ArrowUpRightIcon size={18} />
        </Link>
      </TableCell>
    </TableRow>
  )
}
