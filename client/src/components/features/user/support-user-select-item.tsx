import Loader from "@/components/layouts/loader"
import { SelectItem } from "@/components/ui/select"
import useUsers from "@/hooks/user/use-users"
import { USER_ROLE } from "@/lib/constant"
import { useMemo } from "react"

export default function SupportUserSelectItems() {
  const { users, isLoading } = useUsers()

  const supportUsers = useMemo(
    () => users?.filter((item) => item.role === USER_ROLE.Values.SUPPORT),
    [users]
  )
  
  if (isLoading) {
    return <Loader label="Fetching products" />
  }

  return (
    <>
      {supportUsers?.map((item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.name}
        </SelectItem>
      ))}
    </>
  )
}
