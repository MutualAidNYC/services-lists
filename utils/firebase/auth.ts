import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { PasswordAuthResponse, UserDocument } from 'models/users'
import { auth, authProvider, userRef } from './init'

export const googleSignIn = async () => {
  try {
    const { user } = await signInWithPopup(auth, authProvider)

    const getDocRef = await getDoc(doc(userRef, user.uid))

    if (getDocRef.exists()) {
      return
    }

    const newAccInfo: UserDocument = {
      name: user.displayName || 'Not Available',
      email: user.email || 'Not Available',
      lists: [],
      organization: '',
    }

    await setDoc(doc(userRef, user.uid), newAccInfo)
  } catch (error) {
    console.log(error) // eslint-disable-line no-console
  }
}

export const emailSignUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  organization?: string
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

    const newUser: UserDocument = {
      name: firstName + ' ' + lastName,
      email: email,
      organization: organization,
      lists: [],
    }

    await updateProfile(user, {
      displayName: newUser.name,
    })

    await setDoc(doc(userRef, user.uid), newUser)

    return {
      code: 200,
      message: `User account ${user.email} successfully created.`,
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        code: Number(error.code),
        message: error.message,
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
    if (error instanceof FirebaseError) {
      return {
        code: Number(error.code),
        message: error.message,
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

//The firebase function doesn't return a message/status code, so we have to do it ourselves.
//The code numbers themselves dont really matter. We just want something to display on the UI.
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      status: 200,
      message: `We have sent an email to ${email} . Please follow the instructions to reset your password.`,
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { status: 400, message: error.code }
    }
    return {
      status: 500,
      message: 'There was an issue processing this request',
    }
  }
}
