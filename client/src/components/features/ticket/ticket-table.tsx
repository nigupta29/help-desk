import Loader from "@/components/layouts/loader"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import useTickets from "@/hooks/ticket/use-tickets"
import TicketTableRow from "./ticket-table-row"

export default function TicketTable() {
  const { tickets, isLoading } = useTickets()

  if (isLoading) {
    return (
      <div className="h-56">
        <Loader label={"Hang on! We are fetching your Tickets."} />
      </div>
    )
  }

  if (!tickets || tickets.length === 0) {
    return (
      <Table>
        <TableCaption>No tickets are present.</TableCaption>
      </Table>
    )
  }

  return (
    <Table>
      <TableCaption>A list of your recent tickets.</TableCaption>
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Support</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((item) => (
          <TicketTableRow key={item.id} ticket={item} />
        ))}
      </TableBody>
    </Table>
  )
}
