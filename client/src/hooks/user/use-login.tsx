import { LoginSchemaType, UserSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const loginUserAPI = async ({ email, password }: LoginSchemaType) => {
  const res = await axiosInstance.post("/auth/login", { email, password })
  return UserSchema.parseAsync(res.data.data.user)
}

export default function useLogin() {
  const { mutateAsync: loginUserHandler, isPending: isLoading } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: async (data) => {
      console.log(data)
      toast.success("Logged in successfully")
    },
    onError: showErrorMessage
  })

  return { loginUserHandler, isLoading }
}
