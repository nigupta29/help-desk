import { ticketSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

const getTicketAPI = async (ticketId: string) => {
  const res = await axiosInstance.get("/tickets/" + ticketId)
  return ticketSchema.parseAsync(res.data.data.ticket)
}

export default function useTicket() {
  const { ticketId = "" } = useParams()

  const {
    data: ticket,
    isLoading,
    error
  } = useQuery({
    queryKey: ["tickets", { id: ticketId }],
    queryFn: () => getTicketAPI(ticketId)
  })

  if (error) {
    showErrorMessage(error)
  }

  return { ticket, isLoading }
}
