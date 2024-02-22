import { NewTicketSchemaType, TicketSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const createTicketAPI = async (newTicketData: NewTicketSchemaType) => {
  const res = await axiosInstance.post("/tickets", newTicketData)
  return TicketSchema.parseAsync(res.data.data.ticket)
}

export default function useCreateTicket() {
  const navigate = useNavigate()

  const { mutateAsync: createTicketHandler, isPending: isLoading } =
    useMutation({
      mutationFn: createTicketAPI,
      onSuccess: (data) => {
        //  do something with data
        toast.success("Ticket Created")
        navigate("/dashboard")
      },
      onError: showErrorMessage
    })

  return { createTicketHandler, isLoading }
}
