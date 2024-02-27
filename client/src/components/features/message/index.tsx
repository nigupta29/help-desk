import AddMessageForm from "./add-message-form"
import MessageList from "./message-list"

export default function Message() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Recent Messages</h3>

      <div className="grid grid-cols-2 gap-5">
        <MessageList />
        <AddMessageForm />
      </div>
    </div>
  )
}
