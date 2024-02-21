import useUserStore from "@/hooks/user/use-user-store"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
  const user = useUserStore((state) => state.user)

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
