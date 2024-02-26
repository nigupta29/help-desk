import { NewTicketSchemaType } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

const createTicketAPI = async (newTicketData: NewTicketSchemaType) => {
  const res = await axiosInstance.post("/tickets", newTicketData)
  return z.string().uuid().parse(res.data.data.ticket.id)
}

export default function useCreateTicket() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: createTicketHandler, isPending: isLoading } =
    useMutation({
      mutationFn: createTicketAPI,
      onSuccess: (data) => {
        toast.success("Ticket Created")
        queryClient.invalidateQueries({ queryKey: ["tickets"] })
        navigate("/dashboard/tickets/" + data)
      },
      onError: showErrorMessage
    })

  return { createTicketHandler, isLoading }
}
