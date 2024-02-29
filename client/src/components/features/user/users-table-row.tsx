import { TableCell, TableRow } from "@/components/ui/table"
import { UserSchemaType } from "@/lib/types"

type Props = {
  user: UserSchemaType
}

export default function UsersTableRow({ user }: Props) {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
    </TableRow>
  )
}
