import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ClassValue } from "clsx"; 
import { merge } from "../../utils/tw-merge";
import "./styles/calendar.css"
import { useCalendarStore } from "../store/CalendarStore";
import { useEffect, useState } from "react";
import Event from "@fullcalendar/react"
import { toast } from "./UI/Toast/Use-toast";

export default function Calendar({ className } : { className?: ClassValue}) {
    const [events, setEvents] = useState<Event[]>([])
    const eventsJson = useCalendarStore((state) => state.eventsJson)

    useEffect(() => {
        setEvents(eventsJson)
        // console.log(events)
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
                eventClick={(event) => {
                    toast({
                        title: `${event.event.title} - ${event.event.start!.toDateString()}`,
                        description: `${event.event.start!.toTimeString().split(" ")[0]} - ${event.event.end!.toTimeString().split(" ")[0]}`,
                        className: "bg-white font-poppins text-black shadow-lg"
                    })
                }}
                handleWindowResize
            />
        </div>
    )
}