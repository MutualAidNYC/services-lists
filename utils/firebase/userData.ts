import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserDoc } from "models/users";
import { userRef } from "./init";

export const addToUserOwnedLists = async (listID: string, userData: UserDoc) => {
    await updateDoc(doc(userRef, userData.id), {
        listID: arrayUnion(listID)
    })
}

//Should be used when deleting a list
export const removeListFromUser = async (listID: string, userData: UserDoc) => {
    await updateDoc(doc(userRef, userData.id), {
        listID: arrayRemove(listID)
    })
}