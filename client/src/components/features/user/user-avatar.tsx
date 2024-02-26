import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useUserStore from "@/hooks/user/use-user-store"
import { useMemo } from "react"

export default function UserAvatar() {
  const user = useUserStore((state) => state.user)

  const initials = useMemo(() => {
    return user?.name
      .split(" ")
      .map((item) => item.charAt(0))
      .join("")
      .toUpperCase()
  }, [user?.name])

  return (
    <>
      <Avatar>
        <AvatarImage src={""} alt={`${initials}'s Avatar`} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="capitalize">{user?.name}</span>
    </>
  )
}
