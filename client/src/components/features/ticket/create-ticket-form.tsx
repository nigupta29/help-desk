import Loader from "@/components/layouts/loader"
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import useCreateTicket from "@/hooks/ticket/use-create-ticket"
import useCreateTicketModal from "@/hooks/ticket/use-create-ticket-modal"
import useUserStore from "@/hooks/user/use-user-store"
import { NewTicketSchemaType, newTicketSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ProductSelectItems from "../product/product-select-items"

export default function CreateTicketForm() {
  const user = useUserStore((state) => state.user)
  const toggleModal = useCreateTicketModal((state) => state.toggle)

  const { createTicketHandler, isLoading } = useCreateTicket()

  const form = useForm<NewTicketSchemaType>({
    resolver: zodResolver(newTicketSchema),
    defaultValues: {
      authorUserId: user?.id,
      title: "Battery Issue",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
    }
  })

  const isDisabled = form.formState.isSubmitting || isLoading

  const onSubmit = async (values: NewTicketSchemaType) => {
    await createTicketHandler(values)
    form.reset()
    toggleModal()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="authorUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={user?.name} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Find your product." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ProductSelectItems />
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Brief about your issue"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your issue in detail."
                  className="min-h-52"
                  {...field}
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-4" />

        <Button type="submit" disabled={isDisabled} className="w-full">
          {isDisabled ? <Loader label="Creating ticket" /> : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
