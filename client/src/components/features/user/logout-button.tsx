import { Button } from "@/components/ui/button"
import useUserStore from "@/hooks/user/use-user-store"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { LogOutIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function LogoutButton() {
  const navigate = useNavigate()
  const removeUser = useUserStore((state) => state.removeUser)

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout")
      navigate("/")
      removeUser()
      toast.info("Logged Out Succesfully")
    } catch (error) {
      showErrorMessage(error as Error)
    }
  }

  return (
    <Button
      variant={"destructive"}
      className="justify-start gap-2"
      onClick={handleLogout}
    >
      <LogOutIcon size={20} />
      <span className="capitalize">Logout</span>
    </Button>
  )
}
