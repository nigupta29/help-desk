import useUserStore from "@/hooks/user/use-user-store"
import { USER_ROLE } from "@/lib/constant"
import { Navigate, Outlet } from "react-router-dom"

export default function AdminRoutes() {
  const user = useUserStore((state) => state.user)
  return user?.role === USER_ROLE.Values.ADMIN ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} replace />
  )
}
