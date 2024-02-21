import { LoginSchemaType } from "@/lib/types"
import { axiosInstance } from "@/lib/utils"

export const loginUserAPI = async ({ email, password }: LoginSchemaType) => {
  const res = await axiosInstance.post("/auth/login", { email, password })
  return res.data
}
