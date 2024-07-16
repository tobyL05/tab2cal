import Event from "@fullcalendar/react" 

interface UserDocument {
    displayName: string
    pfp: string
    calendars: string[] // links to user's generated calendars in cloud storage
    date_created: string // account creation date
}

interface EventsDocument {
    events: Event[]
}

export type { UserDocument, EventsDocument }