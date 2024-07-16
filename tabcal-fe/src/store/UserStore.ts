
import { OAuthCredential } from "firebase/auth"
import { create } from "zustand"
import { UserDocument } from "../types/firestore"

interface UserInterface {
    user: UserDocument | undefined
    credential: OAuthCredential | undefined
    setUser: (newUser: UserDocument) => void
    setCreds: (creds: OAuthCredential) => void
    addCalendar: (calendarUUID: string) => void
}

const useUserStore = create<UserInterface>()((set) => ({
    user: undefined,
    credential: undefined,
    setUser: (newUser: UserDocument) => set(() => ({user: newUser})),
    setCreds: (creds: OAuthCredential) => set(() => ({credential: creds})),
    addCalendar: (calendarUUID: string) => set((state) => ({
        user: {
            ...state.user, 
            calendars: [...state.user!.calendars, calendarUUID]
        } as UserDocument
    }))
}))

export { useUserStore }