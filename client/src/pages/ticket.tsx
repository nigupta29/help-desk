import Loader from "@/components/layouts/loader"
import useTicket from "@/hooks/ticket/use-ticket"
import { Navigate, useParams } from "react-router-dom"

export default function Ticket() {
  const { ticketId = "" } = useParams()
  const { ticket, isLoading } = useTicket(ticketId)

  if (isLoading) {
    return <Loader label={"Hang on! We are fetching your ticket details."} />
  }

  if (!ticket) {
    return <Navigate to="/dashboard/tickets" replace />
  }

  return (
    <div>
      <h3>{ticket.title}</h3>
    </div>
  )
}
