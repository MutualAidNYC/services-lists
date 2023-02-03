import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { PasswordAuthResponse, UserDoc } from 'models/users'
import { auth, authProvider, userRef } from './init'

export const googleSignIn = async () => {
  try {
    const { user } = await signInWithPopup(auth, authProvider)

    const getDocRef = await getDoc(doc(userRef, user.uid))

    if (getDocRef.exists()) {
      return
    }

    const newAccInfo: UserDoc = {
      name: user.displayName || 'Not Available',
      email: user.email || 'Not Available',
      lists: [],
    }

    await setDoc(doc(userRef, user.uid), newAccInfo)
  } catch (error) {
    console.log(error) // eslint-disable-line no-console
  }
}

export const emailSignUp = async (
  email: string,
  password: string
): Promise<PasswordAuthResponse> => {
  //NOTE: should do some kind of validation beforehand to make sure that it is a proper email/password combo
  //NOTE: using response codes/messages so the UI can be updated based on whether or not the sign up was successful

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    return {
      code: 200,
      message: `User account ${user.email} successfully created.`,
    }
  } catch (error) {
    if (
      typeof error == 'object' &&
      error &&
      'code' in error &&
      'message' in error
    ) {
      return {
        code: error.code as number, //need to coerce the type because the function does not provide a type for errors
        message: error.message as string,
      }
    } else {
      return {
        code: 500,
        message: 'There was an issue processing this request',
      }
    }
  }
}

export const emailSignIn = async (
  email: string,
  password: string
): Promise<PasswordAuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    return {
      code: 200,
      message: `User account ${user.email} successfully signed in.`,
    }
  } catch (error) {
    if (
      typeof error == 'object' &&
      error &&
      'code' in error &&
      'message' in error
    ) {
      return {
        code: error.code as number, //need to coerce the type because the function does not provide a type for errors
        message: error.message as string,
      }
    } else {
      return {
        code: 500,
        message: 'There was an issue processing this request',
      }
    }
  }
}

export const signout = async () => {
  await auth.signOut()
}
