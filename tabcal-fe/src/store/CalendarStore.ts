import { create } from "zustand"
import Event from "@fullcalendar/react"

interface CalendarResponse {
    eventsJson: Event[]
    ics: string | undefined
    setEventsJson: (newJson: Event[]) => void
    setIcs: (newIcs: string) => void
}

const useCalendarStore = create<CalendarResponse>()((set) => ({
    eventsJson: [],
    ics: undefined,
    setEventsJson: (newJson: Event[]) => set(() => ({eventsJson: newJson})),
    setIcs: (newIcs: string) => set(() => ({ics: newIcs}))
}))

export { useCalendarStore }