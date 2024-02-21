import { LoginSchemaType, UserSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import useUserStore from "./use-user-store"

const loginUserAPI = async ({ email, password }: LoginSchemaType) => {
  const res = await axiosInstance.post("/auth/login", { email, password })
  return UserSchema.parseAsync(res.data.data.user)
}

export default function useLogin() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const { mutateAsync: loginUserHandler, isPending: isLoading } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: async (data) => {
      setUser(data)
      toast.success("Logged in successfully")
      navigate("/dashboard")
    },
    onError: showErrorMessage
  })

  return { loginUserHandler, isLoading }
}
