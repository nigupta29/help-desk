import { ticketsSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getTicketsAPI = async () => {
  const res = await axiosInstance.get("/tickets")
  return ticketsSchema.parseAsync(res.data.data.tickets)
}

export default function useTickets() {
  const {
    data: tickets,
    isLoading,
    error
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTicketsAPI
  })

  if (error) {
    showErrorMessage(error)
  }

  return { tickets, isLoading }
}
