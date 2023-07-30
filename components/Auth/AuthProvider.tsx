import { useDisclosure } from '@chakra-ui/react'
import { onAuthStateChanged, Unsubscribe, User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { UserDocument } from 'models/users'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth, userRef } from 'utils/firebase'

type UseAuthReturn = {
  /** User object for people who've been authenticated */
  authUser?: User
  isLoading: boolean
  /** User database object for storing non-auth info such as a user's collections */
  userData?: UserDocument
  isModalOpen: boolean
  onModalOpen: () => void
  onModalClose: () => void
}

const AuthContext = createContext<UseAuthReturn>({} as UseAuthReturn)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [authUser, setAuthUser] = useState<User>()
  const [userData, setUserData] = useState<UserDocument>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setIsLoading(true)
    let userDocUnsub: Unsubscribe
    const authUserUnsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        userDocUnsub = onSnapshot(doc(userRef, authUser.uid), (doc) => {
          const data = doc.data() as UserDocument
          setUserData(data)
        })
        setAuthUser(authUser)
      } else {
        setAuthUser(undefined)
        setUserData(undefined)
      }
      setIsLoading(false)
    })
    return () => {
      if (typeof userDocUnsub === 'function') {
        userDocUnsub()
      }
      authUserUnsub()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        userData,
        isModalOpen: isOpen,
        onModalOpen: onOpen,
        onModalClose: onClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
