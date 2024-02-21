import useUserStore from "@/hooks/user/use-user-store"

export default function Dashboard() {
  const user = useUserStore((state) => state.user)

  return (
    <div>
      <h3>{user?.name}</h3>
    </div>
  )
}
