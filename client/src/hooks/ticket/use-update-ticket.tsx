import { ID } from "@/lib/constant"
import { UpdateTicketSchemaType } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const updateTicketAPI = async (
  ticketId: string,
  updateTicketData: UpdateTicketSchemaType
) => {
  const res = await axiosInstance.patch(
    "/tickets/" + ticketId,
    updateTicketData
  )
  return ID("Ticket").parse(res.data.data.ticket.id)
}

export default function useUpdateTicket() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { ticketId = "" } = useParams()

  const { mutateAsync: updateTicketHandler, isPending: isLoading } =
    useMutation({
      mutationFn: (data: UpdateTicketSchemaType) =>
        updateTicketAPI(ticketId, data),

      onSuccess: (ticketId) => {
        toast.success("Ticket updated")
        queryClient.invalidateQueries({
          queryKey: ["tickets", { id: ticketId }]
        })
        navigate("/dashboard/tickets/" + ticketId)
      },
      onError: showErrorMessage
    })

  return { updateTicketHandler, isLoading }
}
