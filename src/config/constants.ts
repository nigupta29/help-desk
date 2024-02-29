import { USER_ROLE } from "./enum";

export const userSelector = {
  id: true,
  email: true,
  name: true,
  role: true,
}

export const ticketSelector = (user: { id: string; role: string }) => ({
  id: true,
  title: true,
  description: true,
  priority: !(user.role === USER_ROLE.Values.USER),
  status: true,
  product: true,
  createdAt: true,
  updatedAt: true,
  supportUser: {
    select: userSelector,
  },
  ticketAuthor: {
    select: userSelector,
  },
})
