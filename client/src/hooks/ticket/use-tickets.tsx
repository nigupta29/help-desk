import { TicketsSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getTicketsAPI = async () => {
  const res = await axiosInstance.get("/tickets")
  return TicketsSchema.parseAsync(res.data.data.tickets)
}

export default function useTickets() {
  const {
    data: tickets = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTicketsAPI,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000
  })

  if (error) {
    showErrorMessage(error)
  }

  return { tickets, isLoading }
}
