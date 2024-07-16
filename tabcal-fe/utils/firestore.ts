import { User } from "firebase/auth";
import { Collections, db, storage } from "../.secrets/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { EventsDocument, UserDocument } from "../src/types/firestore";
import Event from "@fullcalendar/react"
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

const getUser = async (uid: string): Promise<UserDocument | undefined>  => {
    try {
        return read<UserDocument>(uid, Collections.USERS)
    } catch (error) {
        return undefined
    }
}


// CALENDARS

const save = async (userUID: string, calendarUUID:string, ics: string, events: Event[]): Promise<boolean>=> {
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
const addEvents = async (uuid: string, events: Event[]): Promise<Event[]> => {
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
        console.log(ics)
        const icsFile = await fetch(`data:text/calendar;base64,${ics}`) 
        const icsBlob = await icsFile.blob()
        console.log(icsBlob)
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

const readCalendars = async(userUID: string): Promise<string[]> => {
    try {
        const user = await read<UserDocument>(userUID, Collections.USERS)
        return user.calendars
    } catch (error) {
        console.log("Error reading user")
        throw error
    }
}


// Returns an Event[] of the given calendarUUID
const getEvents = async(calendarUUID: string): Promise<Event[]> => {
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
    await setDoc(doc(db, collection, id), document);
    console.log(`Successfully wrote ${id}`)
    return document as T
}

// Reads the document with the given id in the given collection
const read = async <T>(id: string, collection: string) => {
    const docSnap = await getDoc(doc(db,collection,id))
    return docSnap.data() as T
}

// Check if the document with the given uid in the given collection exists
// Returns true if the document exists, false if the document doesn't exist, and undefined if 
const checkDocumentExists = async (uid: string, collection: string): Promise<Boolean | undefined> => {
    try {
        const docSnap = await getDoc(doc(db, collection, uid))
        return docSnap.exists()
    } catch (error) {
        return undefined
    }
}


export { checkDocumentExists, addUser, getUser, save, getEvents, getIcsDownloadURL }