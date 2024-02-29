import Loader from "@/components/layouts/loader"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import useUsers from "@/hooks/user/use-users"
import UsersTableRow from "./users-table-row"

export default function UsersTable() {
  const { users, isLoading } = useUsers()

  if (isLoading) {
    return (
      <div className="h-56">
        <Loader label={"Hang on! We are fetching users list."} />
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <Table>
        <TableCaption>No users are present.</TableCaption>
      </Table>
    )
  }

  return (
    <Table>
      <TableCaption>A list of current users.</TableCaption>
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((item) => (
          <UsersTableRow key={item.id} user={item} />
        ))}
      </TableBody>
    </Table>
  )
}
