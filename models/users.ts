export interface UserDoc {
  name: string
  email: string
  organization: string
  /** Array of resource list ids */
  lists: string[]
}

export interface PasswordAuthResponse {
  code: number
  message: string
}
