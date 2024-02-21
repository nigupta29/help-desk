import useUserStore from "@/hooks/user/use-user-store"
import { Navigate, Outlet } from "react-router-dom"
import { Card } from "../ui/card"

export default function AuthFormLayout() {
  // TODO: Redirect if the user is logged need to come up with better strategy
  const user = useUserStore((state) => state.user)

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className="flex items-center justify-center p-5">
      <Card className="w-full md:max-w-lg">
        <Outlet />
      </Card>
    </div>
  )
}
