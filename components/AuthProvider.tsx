import { UserDoc } from 'models/users'
import { onAuthStateChanged, Unsubscribe, User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth, userRef } from 'utils/firebase'

const AuthContext = createContext<{
  user: User | null
  loading: boolean
  userData: UserDoc | null
}>({
  user: null,
  loading: true,
  userData: null,
})

export const useUser = () => {
  return useContext(AuthContext)
}

//There is a distinction between user and userData
//User is the data used by Firebase to distinguish different user accounts
//userDoc is the data we use to handle list ownership

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserDoc | null>(null)

  useEffect(() => {
    setLoading(true)

    let userDocUnsub: Unsubscribe
    const authUserUnsub = onAuthStateChanged(auth, (user) => {
      userDocUnsub = onSnapshot(doc(userRef, user?.uid), (doc) => {
        const data = doc.data() as UserDoc
        setUserData(data)
      })

      setUser(user)
      setLoading(false)
    })

    return () => {
      userDocUnsub()
      authUserUnsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
