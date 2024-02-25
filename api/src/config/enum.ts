import { z } from "zod"

export const USER_ROLE = z.enum(["USER", "SUPPORT", "ADMIN"])
export const TICKET_STATUS = z.enum(["OPEN", "REVIEW", "RESOLVED", "REJECTED"])
export const TICKET_PRIORITY = z.enum(["HIGH", "MEDIUM", "LOW"])
