import { USER_ROLE } from "@/lib/constant"
import { MessageSchemaType } from "@/lib/types"
import { getRelativeDate } from "@/lib/utils"

export default function MessageListItem({
  title,
  user,
  createdAt
}: MessageSchemaType) {
  const isUser = user.role === USER_ROLE.Values.USER

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-md bg-secondary px-4 py-2 text-secondary-foreground`}
      >
        <h5 className="text-lg">{title}</h5>
        <p className={`text-sm ${isUser ? "text-right" : "text-left"}`}>
          {user.name}
        </p>
        <p
          className={`text-sm text-muted-foreground ${isUser ? "text-right" : "text-left"}`}
        >
          {getRelativeDate(createdAt)}
        </p>
      </div>
    </div>
  )
}
