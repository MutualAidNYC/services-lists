/** User Firestore document  */
export interface UserDocument {
  name: string
  email: string
  organization?: string
  /** Array of resource list ids */
  lists: string[]
}

export interface PasswordAuthResponse {
  code: number
  message: string
}

export type AuthState = 'sign_up' | 'log_in' | 'forgot_password'
