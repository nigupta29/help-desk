import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { SheetFooter } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import useUpdateTicket from "@/hooks/ticket/use-update-ticket"
import useUserStore from "@/hooks/user/use-user-store"
import { PRIORITY, STATUS, USER_ROLE } from "@/lib/constant"
import {
  UpdateTicketSchemaType,
  ticketSchema,
  updateTicketSchema
} from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import ProductSelectItems from "../product/product-select-items"

export default function UpdateTicketForm() {
  const { ticketId } = useParams()
  const queryClient = useQueryClient()
  const ticketData = ticketSchema.parse(
    queryClient.getQueryData(["tickets", { id: ticketId }])
  )

  const user = useUserStore((state) => state.user)
  const isUserRole = user?.role === USER_ROLE.Values.USER
  const isSupportRole = user?.role === USER_ROLE.Values.SUPPORT

  const { updateTicketHandler, isLoading } = useUpdateTicket()
  const form = useForm<UpdateTicketSchemaType>({
    resolver: zodResolver(updateTicketSchema),
    defaultValues: {
      productId: ticketData.product.id,
      title: ticketData.title,
      description: ticketData.description,
      status: ticketData.status,
      priority: ticketData.priority,
      assignedUserId:
        ticketData.supportUser?.id ?? (isSupportRole ? user.id : undefined)
    }
  })

  const isTicketAssigned = ticketData.supportUser?.id

  const isDisabled = form.formState.isSubmitting || isLoading

  const onSubmit = (values: UpdateTicketSchemaType) => {
    updateTicketHandler(values)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isUserRole && (
          <>
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                    <Input {...field} />
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
                    <Textarea {...field} className="min-h-[100%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {isSupportRole && (
          <>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Set Status." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUS.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Set Priority." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRIORITY.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Support User</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSupportRole}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign this to me." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={user.id}>{user.name}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {!isTicketAssigned && (
                      <span>
                        You will automatically allocated to this ticket.
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <SheetFooter>
          <Button type="submit" className="w-full" disabled={isDisabled}>
            Save changes
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
