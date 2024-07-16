import { User } from "firebase/auth";
import { Collections, db, storage } from "../.secrets/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { EventsDocument, UserDocument } from "../src/types/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "../src/components/UI/Toast/Use-toast";


// USER 

const addUser = async (user: User): Promise<UserDocument | undefined> => {
    const curr_date = new Date()
    const userDocument: UserDocument = {
        displayName: user.displayName || "",
        pfp: user.photoURL || "",
        calendars: [], 
        date_created: curr_date.toString()
    }
    try {
        const doc = await write<UserDocument>(user.uid, "users", userDocument)
        return doc
      } catch (e) {
        console.error("Error adding document: ", e);
        return undefined
      }
}

const getUser = async (uid: string): Promise<UserDocument>  => {
    try {
        return read<UserDocument>(uid, Collections.USERS)
    } catch (error) {
        console.log(`An error occurred retrieving ${uid}: ${error}`)
        throw error
    }
}


// CALENDARS

const save = async (userUID: string, calendarUUID:string, ics: string, events: CalendarEvent[]): Promise<boolean>=> {
    try {
        await addEvents(calendarUUID, events)
        await uploadIcs(calendarUUID, ics)
        await addCalendar(userUID, calendarUUID)
        return true
    } catch (error) {
        console.log(`Error saving ${calendarUUID}: ${error}`)
        toast({
            title: "something went wrong",
            description: "please try again",
            className: "bg-red-500 text-white font-poppins"
        })
        return false
    }
}


// Write to an "events" collection
const addEvents = async (uuid: string, events: CalendarEvent[]): Promise<Event[]> => {
    // can events be written to a collection?
    try {
        const doc = await write<Event[]>(uuid, Collections.CALENDARS, {
            "events": events
        }) 
        return doc
    } catch (error) {
        console.log(`Error writing ${uuid}: ${error}`)
        throw error
    }
}

// Upload a base64 ics file to Firebase Storage with the given uuid as the file
const uploadIcs = async (uuid: string, ics: string): Promise<string> => {
    const metadata = {
        // name: uuid + ".ics",
        contentType: "text/calendar"
    }
    try{
        const icsFile = await fetch(`data:text/calendar;base64,${ics}`) 
        const icsBlob = await icsFile.blob()
        const upload = await uploadBytes(ref(storage, `${uuid}.ics`), icsBlob, metadata)
        return await getDownloadURL(upload.ref)
    } catch (error) {
        console.log(`An error occurred uploading ${uuid}: ${error}`)
        throw error
    }
}

// Adds the calendar uuid to the user's calendars document field.
// Returns whether or not adding calendar UUID was successful.
const addCalendar = async (userUID: string, calendarUUID: string): Promise<void> => {
    const userRef = doc(db, Collections.USERS, userUID)
    try{
        await updateDoc(userRef, {
            calendars: arrayUnion(calendarUUID)
        })
    } catch (error) {
        console.log(`An error occurred adding ${calendarUUID}: ${error}`)
        throw error
    }
}

// Returns an Event[] of the given calendarUUID
const getEvents = async(calendarUUID: string): Promise<CalendarEvent[]> => {
    try {
        const events = await read<EventsDocument>(calendarUUID, Collections.CALENDARS)
        return events.events
    } catch (error) {
        console.log("Error reading events")
        throw error
    }
}

const getIcsDownloadURL = async (calendarUUID: string): Promise<string> => {
    try {
        return await getDownloadURL(ref(storage, `${calendarUUID}.ics`))
    } catch (error) {
        console.log(`Error getting download url for ${calendarUUID}`)
        throw error
    }
}

// UTIL FUNCTIONS

// Writes the given document to the specified collection. 
// Returns the document 
// Throws an error
const write = async <T>(id: string, collection: string, document: Object) => {
    try {
    await setDoc(doc(db, collection, id), document);
    // console.log(`Successfully wrote ${id}`)
    return document as T
    } catch (error) {
        throw error
    }
}

// Reads the document with the given id in the given collection
const read = async <T>(id: string, collection: string) => {
    try {
        const docSnap = await getDoc(doc(db,collection,id))
        return docSnap.data() as T
    } catch (error) {
        throw error
    }
}

// Check if the document with the given uid in the given collection exists
// Returns true if the document exists, false if the document doesn't exist, and undefined if 
const checkDocumentExists = async (uid: string, collection: string): Promise<Boolean> => {
    try {
        const docSnap = await getDoc(doc(db, collection, uid))
        return docSnap.exists()
    } catch (error) {
        throw error
    }
}

const somethingWentWrong = (): void => {
    toast({
        title: "something went wrong",
        description: "are you connected to the internet?",
        className: "bg-red-500 text-white font-poppins"
    })
}

export { checkDocumentExists, addUser, getUser, save, getEvents, getIcsDownloadURL }