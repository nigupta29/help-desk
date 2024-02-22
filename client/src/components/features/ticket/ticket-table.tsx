import Loader from "@/components/layouts/loader"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import useTickets from "@/hooks/ticket/use-tickets"
import TicketTableRow from "./ticket-table-row"

export default function TicketTable() {
  const { tickets, isLoading } = useTickets()

  if (isLoading) {
    return <Loader label={"Hang on! We are fetching you Tickets."} />
  }

  if (tickets.length === 0) {
    return (
      <Table>
        <TableCaption>No tickets are present.</TableCaption>
      </Table>
    )
  }

  return (
    <Table>
      <TableCaption>A list of your recent tickets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Updates</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((item) => (
          <TicketTableRow key={item.id} ticket={item} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Tickets:</TableCell>
          <TableCell className="text-right">{tickets.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
