import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { CustomError } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
})

// TODO: handle zod errors
export const showErrorMessage = (error: CustomError) => {
  const message = error.response
    ? (error?.response?.data?.message as string)
    : error.message

  toast.error(message)
}
