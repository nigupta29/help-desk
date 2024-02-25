declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        role: string
      }

      userId: string
    }
  }
}

export {}

