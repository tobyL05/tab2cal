import { create } from "zustand"

interface CalendarResponse {
    eventsJson: CalendarEvent[]
    ics: string | undefined
    setEventsJson: (newJson: CalendarEvent[]) => void
    setIcs: (newIcs: string) => void
}

const useCalendarStore = create<CalendarResponse>()((set) => ({
    eventsJson: [],
    ics: undefined,
    setEventsJson: (newJson: CalendarEvent[]) => set(() => ({eventsJson: newJson})),
    setIcs: (newIcs: string) => set(() => ({ics: newIcs}))
}))

export { useCalendarStore }