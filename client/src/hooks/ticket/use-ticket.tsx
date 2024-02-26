import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

// TODO: add zod validation
const getTicketAPI = async (ticketId: string) => {
  const res = await axiosInstance.get("/tickets/" + ticketId)
  return res.data.data.ticket
}

export default function useTicket(ticketId: string) {
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
