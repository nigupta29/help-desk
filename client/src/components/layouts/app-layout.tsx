import useUserStore from "@/hooks/user/use-user-store"
import { UserSchema } from "@/lib/types"
import { axiosInstance } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { Outlet } from "react-router-dom"
import Loader from "./loader"
import Navbar from "./navbar"

const checkUserSessionAPI = async () => {
  const res = await axiosInstance.get("/auth/check")
  return UserSchema.parseAsync(res.data.data.user)
}

export default function AppLayout() {
  // TODO: come up with better approach to sync the login session
  const setUser = useUserStore((state) => state.setUser)
  const removeUser = useUserStore((state) => state.removeUser)

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: checkUserSessionAPI,
    retry: 0
  })

  if (isLoading)
    return (
      <div className="h-screen bg-accent/80">
        <Loader />
      </div>
    )
  if (data) {
    setUser(data)
  } else {
    removeUser()
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
