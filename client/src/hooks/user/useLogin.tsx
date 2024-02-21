import { TLogin } from "@/lib/types"
import { axiosInstance } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const loginUserAPI = async ({ email, password }: TLogin) => {
  const res = await axiosInstance.post("/auth/login", { email, password })
  return res.data.data
}

export default function useLogin() {
  const { mutateAsync: loginUserHandler, isPending: isLoading } = useMutation({
    mutationFn: loginUserAPI,
    mutationKey: ["login"],
    onSuccess: async (data) => {
      console.log(data)
    },
    onError(error) {
      toast.error(error?.response?.data?.message)
    }
  })

  return { loginUserHandler, isLoading }
}
