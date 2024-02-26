import { TableCell, TableRow } from "@/components/ui/table"
import { TicketSchemaType } from "@/lib/types"

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
      <TableCell>{ticket.updatedAt}</TableCell>
    </TableRow>
  )
}
