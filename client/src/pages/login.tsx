import Loader from "@/components/layouts/loader"
import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useLogin from "@/hooks/user/useLogin"
import { LoginSchema, LoginSchemaType } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "john_doe@gmail.com",
      password: "123456"
    }
  })

  const { isLoading, loginUserHandler } = useLogin()

  const onSubmit = async (formData: LoginSchemaType) => {
    await loginUserHandler(formData)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome</CardTitle>
        <CardDescription>
          Enter your credentials below to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="e.g. john_doe@gmail.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="e.g. 123456"
          />
          {errors.password && (
            <p className="text-sm text-destructive">{`${errors.password.message}`}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isSubmitting || isLoading}>
          {isSubmitting ? <Loader label="Logging in" /> : <span>Login</span>}
        </Button>
      </CardFooter>
    </form>
  )
}
