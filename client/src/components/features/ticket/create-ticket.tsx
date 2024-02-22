import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { PencilLineIcon } from "lucide-react"
import CreateTicketForm from "./create-ticket-form"
import useCreateTicketModal from "@/hooks/ticket/use-create-ticket-modal"

export default function CreateTicket() {
  const isOpen = useCreateTicketModal((state) => state.open)
  const toggleModal = useCreateTicketModal((state) => state.toggle)

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button size={"lg"} variant={"default"}>
          <span className="mr-2 hidden md:block">Create Ticket</span>
          <PencilLineIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Ticket</DialogTitle>
          <DialogDescription>
            Describe your issue in this ticket, and we'll swiftly reach out to
            assist you.
          </DialogDescription>
        </DialogHeader>
        <CreateTicketForm />
      </DialogContent>
    </Dialog>
  )
}
