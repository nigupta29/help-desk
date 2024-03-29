import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import useUpdateTicketModal from "@/hooks/ticket/use-update-ticket-modal"
import { EditIcon } from "lucide-react"
import UpdateTicketForm from "./update-ticket-form"

export default function UpdateTicket() {
  const isOpen = useUpdateTicketModal((state) => state.open)
  const toggleModal = useUpdateTicketModal((state) => state.toggle)

  return (
    <Sheet open={isOpen} onOpenChange={toggleModal}>
      <SheetTrigger asChild>
        <Button className="space-x-2" variant="outline">
          <span>Update</span>
          <EditIcon size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full px-5">
          <SheetHeader>
            <SheetTitle>Update Ticket</SheetTitle>
            <SheetDescription>
              Make changes to your ticket here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <UpdateTicketForm />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
