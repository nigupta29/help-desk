import { NewTicketSchemaType } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const createTicketAPI = async (newTicketData: NewTicketSchemaType) => {
  await axiosInstance.post("/tickets", newTicketData)
}

export default function useCreateTicket() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: createTicketHandler, isPending: isLoading } =
    useMutation({
      mutationFn: createTicketAPI,
      onSuccess: () => {
        toast.success("Ticket Created")
        queryClient.invalidateQueries({ queryKey: ["tickets"] })
        navigate("/dashboard/tickets")
      },
      onError: showErrorMessage
    })

  return { createTicketHandler, isLoading }
}
