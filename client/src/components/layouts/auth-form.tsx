import { Outlet } from "react-router-dom"
import { Card } from "../ui/card"

export default function AuthForm() {
  return (
    <div className="flex items-center justify-center p-5">
      <Card className="w-full md:max-w-lg">
        <Outlet />
      </Card>
    </div>
  )
}
