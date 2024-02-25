import { z } from "zod"

export const UserRole = z.enum(["USER", "SUPPORT", "ADMIN"])
export const TicketStatus = z.enum(["OPEN", "REVIEW", "RESOLVED", "REJECTED"])
export const TicketPriority = z.enum(["HIGH", "MEDIUM", "LOW"])
