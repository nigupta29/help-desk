import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export default function UsersTable() {
  return (
    <Table>
      <TableCaption>A list of current users.</TableCaption>
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {tickets.map((item) => (
          <TicketTableRow key={item.id} ticket={item} />
        ))} */}
      </TableBody>
    </Table>
  )
}
