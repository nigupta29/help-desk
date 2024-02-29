import Message from "@/components/features/message"
import UpdateTicket from "@/components/features/ticket/update-ticket"
import Loader from "@/components/layouts/loader"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import useTicket from "@/hooks/ticket/use-ticket"
import useUserStore from "@/hooks/user/use-user-store"
import { getRelativeDate } from "@/lib/utils"
import { Navigate } from "react-router-dom"

export default function Ticket() {
  const user = useUserStore((state) => state.user)
  const isUserRole = user?.role === "USER"

  const { ticket, isLoading } = useTicket()

  if (isLoading) {
    return (
      <div className="h-56">
        <Loader label={"Hang on! We are fetching your ticket details."} />
      </div>
    )
  }

  if (!ticket) {
    return <Navigate to="/dashboard/tickets" replace />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-10">
        <h1 className="text-3xl font-bold">Ticket Details</h1>

        <UpdateTicket />
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-semibold">{`${ticket.title}`}</h3>
        <p className="text-base text-muted-foreground">{ticket.description}</p>
      </div>

      <Table>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            {!isUserRole && (
              <>
                <TableHead>Priority</TableHead>
                <TableHead>Author</TableHead>
              </>
            )}
            <TableHead>Support</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Last updated on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{ticket.product.name}</TableCell>
            <TableCell>{ticket.status}</TableCell>
            {!isUserRole && (
              <>
                <TableCell>{ticket.priority}</TableCell>
                <TableCell>{ticket.ticketAuthor.name}</TableCell>
              </>
            )}
            <TableCell>{ticket.supportUser?.name ?? "-"}</TableCell>
            <TableCell>{getRelativeDate(ticket.createdAt as string)}</TableCell>
            <TableCell>{getRelativeDate(ticket.updatedAt)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Separator />

      <Message />
    </div>
  )
}
