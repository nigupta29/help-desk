import useUserStore from "@/hooks/user/use-user-store"
import { useLocation } from "react-router-dom"

export default function Dashboard() {
  const user = useUserStore((state) => state.user)
  const { pathname } = useLocation()

  return (
    <div>
      <h3>I am a Dashboard</h3>
      <p>{pathname}</p>
      <p>{user?.name}</p>
    </div>
  )
}
