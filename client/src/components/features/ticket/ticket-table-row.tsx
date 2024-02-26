import { TableCell, TableRow } from "@/components/ui/table"
import { TicketSchemaType } from "@/lib/types"
import { getRelativeDate } from "@/lib/utils"

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
    </TableRow>
  )
}
