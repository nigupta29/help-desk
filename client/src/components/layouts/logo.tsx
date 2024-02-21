import { cn } from "@/lib/utils"
import { FileQuestionIcon } from "lucide-react"
import { FC } from "react"

type Props = {
  large?: boolean
}

const Logo: FC<Props> = ({ large }) => {
  return (
    <div className="group flex items-start space-x-2 px-4">
      <FileQuestionIcon size={large ? 35 : 25} />
      <p className={cn("text-xl font-semibold", large && "text-3xl")}>
        <span className="decoration-primary underline">h</span>
        <span>elpDesk</span>
        <span
          className={cn(
            "text-primary text-5xl",
            large && "text-7xl",
            "leading-[1px]"
          )}
        >
          .
        </span>
      </p>
    </div>
  )
}

export default Logo
