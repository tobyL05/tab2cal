import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ClassValue } from "clsx";
import { merge } from "../../utils/tw-merge";
import "./styles/calendar.css"


export default function Calendar({ className } : { className?: ClassValue}) {

    return (
        <div className={merge(className,"h-full")}>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
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
                    right: 'today,prev,next'
                }}
                handleWindowResize
            />
        </div>
    )
}