import { Outlet } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import Container from "./container"

export default function AuthFormLayout() {
  return (
    <Container>
      <Card className="mx-auto my-8 p-8 md:w-1/2">
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </Container>
  )
}
