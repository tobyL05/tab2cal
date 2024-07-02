import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ClassValue } from "clsx"; 
import { merge } from "../../utils/tw-merge";
import "./styles/calendar.css"
import { useCalendarStore } from "../store/CalendarStore";
import { useEffect, useState } from "react";
import Event from "@fullcalendar/react"

export default function Calendar({ className } : { className?: ClassValue}) {
    const [events, setEvents] = useState<Event[]>([])
    const eventsJson = useCalendarStore((state) => state.eventsJson)

    useEffect(() => {
        setEvents(eventsJson)
        console.log(events)
    },[eventsJson])

    return (
        <div className={merge(className,"h-full")}>
            <FullCalendar
                plugins={[ dayGridPlugin  ]}
                initialView="dayGridMonth"
                height="100%"
                buttonText={{
                    today:    'today',
                    month:    'month',
                    week:     'week',
                    day:      'day',
                    list:     'list'
                }}
                headerToolbar={{
                    start: 'title',
                    center: '',
                    right: 'today,prev,next'
                }}
                events={events}
                eventMouseEnter={(event) => {
                    console.log(event.event.title)
                    console.log(event.event.start)
                    console.log(event.event.end)
                }}
                handleWindowResize
            />
        </div>
    )
}