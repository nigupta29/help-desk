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
import useRegister from "@/hooks/user/use-register"
import { RegisterSchema, RegisterSchemaType } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
    // reset
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema)
  })

  const { isLoading, registerUserHandler } = useRegister()
  const isDisabled = isLoading || isSubmitting

  const onSubmit = (formData: RegisterSchemaType) => {
    registerUserHandler(formData)
    // reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome</CardTitle>
        <CardDescription>Enter your details below to continue.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            {...register("name")}
            type="name"
            placeholder="John Doe"
            disabled={isDisabled}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{`${errors.name.message}`}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="e.g. john_doe@gmail.com"
            disabled={isDisabled}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="e.g. 123456"
            disabled={isDisabled}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{`${errors.password.message}`}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="e.g. 123456"
            disabled={isDisabled}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isDisabled} type="submit">
          {isSubmitting ? (
            <Loader label="Creating" />
          ) : (
            <span>Create Account</span>
          )}
        </Button>
      </CardFooter>
    </form>
  )
}
