import { usersSchema } from "@/lib/types"
import { axiosInstance, showErrorMessage } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

const getUsersAPI = async () => {
  const res = await axiosInstance.get("/users")
  return usersSchema.parseAsync(res.data.data.users)
}

export default function useUsers() {
  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAPI
  })

  if (error) {
    showErrorMessage(error)
  }

  return { users, isLoading }
}
