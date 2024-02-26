import useUserStore from "@/hooks/user/use-user-store"

export default function Dashboard() {
  const user = useUserStore((state) => state.user)

  return (
    <div>
      <h3>I am a Dashboard</h3>
      <p>{user?.name}</p>
    </div>
  )
}
