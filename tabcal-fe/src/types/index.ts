
// image: base64 encoded string
// repeat: undefined or string to end recurrence (yyyymmddT0000)
// type CalendarSettings = {
//     image: string
//     endRepeat: string | undefined
// }

// summary: name of the event
// startTime: yyyymmddThhmm
// endTime: yyyymmddThhmm
// rrule = recurrencerule
type CalendarEvent = {
    title: string
    loc: string
    start?: string
    end?: string
    startTime?: string
    endTime?: string
    startRecur?: string
    endRecur?: string
    daysOfWeek?: string
}



// name: Calendar name
// events: List of events
// type Calendar = {
//     name: string
//     events: CalendarEvent[]

// }

