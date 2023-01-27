export interface UserDoc {
  name: string
  email: string
  /** Array of resource list ids */
  lists: string[]
}

export interface PasswordAuthResponse {
  code: number
  message: string
}
