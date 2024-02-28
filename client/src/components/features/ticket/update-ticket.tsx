import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { EditIcon } from "lucide-react"
import UpdateTicketForm from "./update-ticket-form"

export default function UpdateTicket() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="space-x-2" variant="outline">
          <span>Update</span>
          <EditIcon size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Ticket</SheetTitle>
          <SheetDescription>
            Make changes to your ticket here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <UpdateTicketForm />
      </SheetContent>
    </Sheet>
  )
}