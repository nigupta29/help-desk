import { Outlet } from "react-router-dom"
import Container from "./container"

export default function AuthFormLayout() {
  return (
    <Container>
      <div className="mx-auto my-8 flex items-center justify-center rounded-lg border p-8 shadow md:w-1/2">
        <Outlet />
      </div>
    </Container>
  )
}
