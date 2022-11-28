import { signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { PasswordAuthResponse, UserDoc } from "models/users";
import { auth, authProvider, userRef } from "./init";

export const googleSignIn = async () => {
    try {
        const { user } = await signInWithPopup(auth, authProvider);

        const getDocRef = await getDoc(doc(userRef, user.uid));

        if (getDocRef.exists()) {
            return;
        }

        const newAccInfo: UserDoc = {
            name: user.displayName || "Not Available",
            email: user.email || "Not Available",
            id: user.uid,
            lists: []
        };

        await setDoc(doc(userRef, user.uid), newAccInfo);
    } catch (error) {
        console.log(error); // eslint-disable-line no-console
    }
};

export const emailSignUp = (email: string, password: string): PasswordAuthResponse => {
    //NOTE: should do some kind of validation beforehand to make sure that it is a proper email/password combo
    //NOTE: using response codes/messages so the UI can be updated based on whether or not the sign up was successful
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            return {
                code: 201,
                message: `User account ${user.email} successfully created.`
            }
        })
        .catch((error) => {
            return {
                code: error.code,
                message: error.message
            }
        });
    return {
        code: 500,
        message: "There was an issue processing this request"
    }
}

export const emailSignIn = (email: string, password: string): PasswordAuthResponse => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return {
                code: 201,
                message: `User account ${user.email} successfully signed in.`
            }
        })
        .catch((error) => {
            return {
                code: error.code,
                message: error.message
            }
        });
    return {
        code: 500,
        message: "There was an issue processing this request"
    }
}



export const signout = async () => {
    await auth.signOut();
}