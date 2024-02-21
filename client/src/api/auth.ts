import { TLogin } from "@/lib/types"
import { axiosInstance } from "@/lib/utils"

export const loginUserAPI = async ({ email, password }: TLogin) => {
  const res = await axiosInstance.post("/auth/login", { email, password })
  return res.data
}
