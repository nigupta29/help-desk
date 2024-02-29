import { Outlet } from "react-router-dom"
import { Card, CardContent } from "../ui/card"

export default function AuthFormLayout() {
  return (
    <Card className="mx-auto p-8 md:w-1/2">
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  )
}
