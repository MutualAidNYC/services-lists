import { UserDoc } from 'models/users'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth, userRef } from 'utils/firebase'

const authContext = createContext<{
  user: User | null
  userLoading: boolean
  userData: UserDoc | null
  userDataLoading: boolean
}>({
  user: null,
  userLoading: true,
  userData: null,
  userDataLoading: true,
})

export const useUser = () => {
  return useContext(authContext)
}

//There is a distinction between user and userData
//User is the data used by Firebase to distinguish different user accounts
//userData is the data we use to handle list ownership

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserDoc | null>(null)
  const [userDataLoading, setUserDataLoading] = useState(true)

  useEffect(() => {
    setUserDataLoading(true)
    if (user) {
      const unsub = onSnapshot(doc(userRef, user.uid), (doc) => {
        const data = doc.data() as UserDoc
        setUserData(data)
        setUserDataLoading(false)
      })

      return unsub
    } else {
      setUserData(null)
      setUserDataLoading(false)
    }
  }, [user])

  useEffect(() => {
    setLoading(true)

    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsub
  }, [])

  return (
    <authContext.Provider
      value={{ user, userLoading, userData, userDataLoading }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
