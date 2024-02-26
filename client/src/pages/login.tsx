import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useLogin from "@/hooks/user/use-login"
import { LoginSchemaType, loginSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function Login() {
  const { loginUserHandler, isLoading } = useLogin()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "john_doe@gmail.com",
      password: "123456"
    }
  })

  const isDisabled = isLoading || form.formState.isSubmitting

  function onSubmit(values: LoginSchemaType) {
    loginUserHandler(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Create an Account!</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to access your account
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. john_doe@gmail.com"
                  type="email"
                  {...field}
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 123456"
                  type="password"
                  {...field}
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isDisabled}>
          Login
        </Button>
      </form>
    </Form>
  )
}
