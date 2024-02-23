import Loader from "@/components/layouts/loader"
import { Badge } from "@/components/ui/badge"
import useProductDetails from "@/hooks/product/use-product-details"
import useTicket from "@/hooks/ticket/use-ticket"
import { getRelativeDate } from "@/lib/utils"
import { useParams } from "react-router-dom"

export default function Ticket() {
  const { ticketId } = useParams()
  const { ticket, isLoading } = useTicket(ticketId as string)
  const { productName } = useProductDetails(ticket?.productId as string)

  if (isLoading) {
    return <Loader label={"Hang on! We are fetching your ticket details."} />
  }

  if (!ticket) return null

  return (
    <div className="">
      <h1 className="mb-4 text-3xl font-semibold">{ticket.title}</h1>
      <p className="mb-2 text-gray-600">{ticket.description}</p>

      <div className="mb-2 text-blue-500">{productName}</div>

      <Badge variant={"secondary"}>{ticket.status}</Badge>
      <Badge variant={"outline"}>{ticket.priority}</Badge>

      <div className="mb-2 text-gray-500">
        Created On: {getRelativeDate(ticket.createdAt)}
      </div>
      <div className="text-gray-500">
        Last Updated On: {getRelativeDate(ticket.updatedAt)}
      </div>
    </div>
  )
}
