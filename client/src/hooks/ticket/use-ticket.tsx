import { TicketSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getTicketAPI = async (ticketId: string) => {
  const res = await axiosInstance.get("/tickets/" + ticketId)
  return TicketSchema.parseAsync(res.data.data.ticket)
}

export default function useTicket(ticketId: string) {
  const {
    data: ticket,
    isLoading,
    error
  } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => getTicketAPI(ticketId)
  })

  if (error) {
    showErrorMessage(error)
  }

  return { ticket, isLoading }
}
