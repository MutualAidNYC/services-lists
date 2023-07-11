import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { userRef } from './init'

export const addToUserOwnedLists = async (listID: string, userID: string) => {
  await updateDoc(doc(userRef, userID), {
    lists: arrayUnion(listID),
  })
}

//Should be used when deleting a list
export const removeListFromUser = async (listID: string, userID: string) => {
  await updateDoc(doc(userRef, userID), {
    lists: arrayRemove(listID),
  })
}
