import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { FormEvent } from "react"
import ProductSelectItems from "../product/product-select-items"

export default function CreateTicketForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" defaultValue="John Doe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input id="title" placeholder="Brief about your issue" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productId" className="text-right">
          Product
        </Label>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose your product" />
          </SelectTrigger>
          <SelectContent id="productId">
            <ProductSelectItems />
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Tell us about your issue in detail."
          className="min-h-52"
        />
      </div>

      <Separator className="my-4" />

      <DialogFooter>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  )
}
