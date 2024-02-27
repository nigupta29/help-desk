import { NewMessageSchemaType } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const addMessageAPI = async (
  ticketId: string,
  newMessageData: NewMessageSchemaType
) => {
  await axiosInstance.post("/messages/" + ticketId, newMessageData)
}

export default function useAddMessage(ticketId: string) {
  const queryClient = useQueryClient()

  const { mutateAsync: addMessageHandler, isPending: isLoading } = useMutation({
    mutationFn: (data: NewMessageSchemaType) => addMessageAPI(ticketId, data),
    onSuccess: () => {
      toast.success("Message Added")
      queryClient.invalidateQueries({
        queryKey: ["messages", { id: ticketId }]
      })
    },
    onError: showErrorMessage
  })

  return { addMessageHandler, isLoading }
}
