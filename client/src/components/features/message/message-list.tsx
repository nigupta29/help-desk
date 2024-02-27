import Loader from "@/components/layouts/loader"
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
    <ul className="space-y-2">
      {messages?.map((item) => <MessageListItem key={item.id} {...item} />)}
    </ul>
  )
}
