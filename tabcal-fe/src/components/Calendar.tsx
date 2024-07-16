import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ClassValue } from "clsx"; 
import { merge } from "../../utils/tw-merge";
import "./styles/calendar.css"
import { useCalendarStore } from "../store/CalendarStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "./UI/Toast/Use-toast";
import { CalendarApi } from "@fullcalendar/core/index.js";

export default function Calendar({ className } : { className?: ClassValue}) {
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const eventsJson: CalendarEvent[] = useCalendarStore((state) => state.eventsJson)

    const calendarRef = useRef(null)

    useEffect(() => {
        setEvents(eventsJson)
        if (eventsJson.length != 0) {
            // literally the worst docs
            const calendarApi: CalendarApi = calendarRef.current!.getApi()

            // no repeat date: 2024-10-14T10:00:00 (correct)
            // repeat date: 20240715T1400 (incorrect)
            let date = eventsJson[0].startRecur
            if (date) {
                // temporary fix. Backend date format is inconsistent
                date = date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,11) + ":" + date.substring(11,13) + ":00"
            } else {
                date = eventsJson[0].start
            }
            calendarApi.gotoDate(new Date(date as string) || new Date(date as string))
        }
    },[eventsJson])

    return (
        <div className={merge(className,"h-full")}>
            <FullCalendar
                ref={calendarRef}
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