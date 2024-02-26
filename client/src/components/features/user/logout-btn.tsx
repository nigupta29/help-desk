import { Button } from "@/components/ui/button"
import useUserStore from "@/hooks/user/use-user-store"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { LogOutIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function LogoutButton() {
  const navigate = useNavigate()
  const removeUser = useUserStore((state) => state.removeUser)

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: async () => await axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      toast.info("Logged Out Successfully")
      removeUser()
      navigate("/")
    },
    onError: (error) => {
      showErrorMessage(error as Error)
    },
    retry: 0
  })

  const handleLogout = () => {
    logoutMutation()
  }

  return (
    <Button
      variant={"destructive"}
      className="justify-start gap-2"
      onClick={handleLogout}
      disabled={isPending}
    >
      <LogOutIcon size={20} />
      <span className="capitalize">Logout</span>
    </Button>
  )
}
