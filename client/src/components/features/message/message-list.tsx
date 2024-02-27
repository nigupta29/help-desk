import Loader from "@/components/layouts/loader"
import { ScrollArea } from "@/components/ui/scroll-area"
import useMessages from "@/hooks/message/use-messages"
import { useParams } from "react-router-dom"
import MessageListItem from "./message-list-item"

export default function MessageList() {
  const { ticketId = "" } = useParams()
  const { messages, isLoading } = useMessages(ticketId)

  if (isLoading) return <Loader label="Fetching recent messages" />

  if (messages?.length === 0)
    return (
      <p className="text-muted-foreground">
        No messages are there to display...
      </p>
    )

  return (
    <ScrollArea className="h-96 w-full rounded-lg border p-3 ">
      <div className="space-y-2">
        {messages?.map((item) => <MessageListItem key={item.id} {...item} />)}
      </div>
    </ScrollArea>
  )
}
