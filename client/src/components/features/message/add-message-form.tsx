import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import useAddMessage from "@/hooks/message/use-add-message"
import { NewMessageSchemaType, newMessageSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

export default function AddMessageForm() {
  const { ticketId = "" } = useParams()

  const form = useForm<NewMessageSchemaType>({
    resolver: zodResolver(newMessageSchema),
    defaultValues: {
      title: ""
    }
  })

  const { addMessageHandler, isLoading } = useAddMessage(ticketId)

  const isDisabled = isLoading || form.formState.isSubmitting

  function onSubmit(values: NewMessageSchemaType) {
    addMessageHandler(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Add any context which can help us to solve your issue."
                  {...field}
                  disabled={isDisabled}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isDisabled || form.getValues("title") === ""}
          size={"lg"}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
