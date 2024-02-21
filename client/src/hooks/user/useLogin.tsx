import { LoginSchemaType, UserSchema } from "@/lib/types"
import { axiosInstance } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const loginUserAPI = async ({ email, password }: LoginSchemaType) => {
  const res = await axiosInstance.post("/auth/login", { email, password })
  return UserSchema.parseAsync(res.data.data.user)
}

export default function useLogin() {
  const { mutateAsync: loginUserHandler, isPending: isLoading } = useMutation({
    mutationFn: loginUserAPI,
    mutationKey: ["login"],
    onSuccess: async (data) => {
      // console.log(data)
    },
    onError(error) {
      console.log(error)
      toast.error(
        error?.response?.data?.message ||
          error?.message[0]?.message ||
          error.message
      )
    }
  })

  return { loginUserHandler, isLoading }
}
