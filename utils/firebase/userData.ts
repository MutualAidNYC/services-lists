import { doc, setDoc } from "firebase/firestore";
import { UserDoc } from "models/users";
import { userRef } from "./init";

export const addToUserOwnedLists = async (listID: string, userData: UserDoc) => {

    const newUserData: UserDoc = {
        ...userData,
        lists: [...userData.lists, listID]
    }

    await setDoc(doc(userRef, userData.id), newUserData);

}

//Should be used when deleting a list
export const removeListFromUser = async (listID: string, userData: UserDoc) => {

    const newUserData: UserDoc = {
        ...userData,
        lists: userData.lists.filter((val) => val !== listID)
    }

    await setDoc(doc(userRef, userData.id), newUserData);


}