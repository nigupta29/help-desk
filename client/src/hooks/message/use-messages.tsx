import { messagesSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getMessagesAPI = async (ticketId: string) => {
  const res = await axiosInstance.get("/messages/" + ticketId)
  return messagesSchema.parseAsync(res.data.data.messages)
}

export default function useMessages(ticketId: string) {
  const {
    data: messages,
    isLoading,
    error
  } = useQuery({
    queryKey: ["messages", { id: ticketId }],
    queryFn: () => getMessagesAPI(ticketId)
  })

  if (error) {
    showErrorMessage(error)
  }

  return { messages, isLoading }
}
