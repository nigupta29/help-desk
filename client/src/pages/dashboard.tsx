import { useLocation } from "react-router-dom"

export default function Dashboard() {
  const { pathname } = useLocation()

  return <div>{pathname}</div>
}
