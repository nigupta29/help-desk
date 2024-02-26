import { TableCell, TableRow } from "@/components/ui/table"
import { TicketSchemaType } from "@/lib/types"
import { getRelativeDate } from "@/lib/utils"
import { ArrowUpRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  ticket: TicketSchemaType
}

export default function TicketTableRow({ ticket }: Props) {
  return (
    <TableRow key={ticket.id}>
      <TableCell>{ticket.title}</TableCell>
      <TableCell>{ticket.product.name}</TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>{ticket.supportUser?.name ?? "-"}</TableCell>
      <TableCell>{getRelativeDate(ticket.updatedAt)}</TableCell>
      <TableCell>
        <Link
          to={`${ticket.id}`}
          className="flex items-end text-muted-foreground hover:text-secondary-foreground hover:underline"
        >
          <span>View</span>
          <ArrowUpRightIcon size={18} />
        </Link>
      </TableCell>
    </TableRow>
  )
}
