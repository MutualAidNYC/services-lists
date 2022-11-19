import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { UserDoc } from "models/users";
import { auth, authProvider, userRef } from "./init";

export const signin = async () => {
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


export const signout = async () => {
    await auth.signOut();
}