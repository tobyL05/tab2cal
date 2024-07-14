
interface UserDocument {
    displayName: string
    pfp: string
    calendars: string[] // links to user's generated calendars in cloud storage
    date_created: string // account creation date
}

export type { UserDocument }