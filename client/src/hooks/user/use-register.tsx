import { RegisterSchemaType, userSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import useUserStore from "./use-user-store"

const registerUserAPI = async ({
  name,
  email,
  password
}: RegisterSchemaType) => {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password
  })
  return userSchema.parseAsync(res.data.data.user)
}

export default function useRegister() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const { mutateAsync: registerUserHandler, isPending: isLoading } = useMutation({
    mutationFn: registerUserAPI,
    onSuccess: async (data) => {
      setUser(data)
      toast.success("Registered successfully")
      navigate("/dashboard")
    },
    onError: showErrorMessage
  })

  return { registerUserHandler, isLoading }
}
