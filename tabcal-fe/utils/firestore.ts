import { User } from "firebase/auth";
import { db } from "../.secrets/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserDocument } from "../src/types/firestore";

const checkUserAlreadyExists = async (uid: string): Promise<Boolean> => {
    try {
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        return docSnap.exists()
    } catch (error) {
        return false
    }
}

const addUser = async (user: User): Promise<UserDocument | undefined> => {
    const curr_date = new Date()
    const userDocument: UserDocument = {
        displayName: user.displayName || "",
        pfp: user.photoURL || "",
        calendars: [], 
        date_created: curr_date.toString()
    }
    try {
        await setDoc(doc(db,"users", user.uid), userDocument);
        console.log(`Successfully wrote ${user.uid}`)
        return userDocument
      } catch (e) {
        console.error("Error adding document: ", e);
        return undefined
      }
}

const getUser = async (uid: string): Promise<UserDocument | undefined>  => {
    try {
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as UserDocument
    } catch (error) {
        return undefined
    }
}

export { checkUserAlreadyExists, addUser, getUser }