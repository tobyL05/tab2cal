import { getEvents, getIcsDownloadURL } from "../../utils/firestore"
import { useCalendarStore } from "../store/CalendarStore"
import { MdDownload } from "react-icons/md"
import { toast } from "./UI/Toast/Use-toast"
import { CiCalendar } from "react-icons/ci"

export default function SavedCalendar({ calendarUUID, index } : { calendarUUID: string, index: number }){ 
    const setEventsJson = useCalendarStore((state) => state.setEventsJson)
    async function handleClick() {
        setEventsJson(await getEvents(calendarUUID))
    }

    async function downloadIcs() {
        const a = document.createElement("a");
        a.href = await getIcsDownloadURL(calendarUUID);
        a.download = 'tab2cal.ics';
        a.click();
        toast({
            title: `downloading ${calendarUUID}.ics!`,
            description: "make sure the calendar is correct! sometimes tab2cal generates incorrect results.",
            className: "bg-green-500 font-poppins text-white"
        })
    }

    return (
        <div className="w-full flex flex-row justify-between items-center ring-offset-2 py-4 px-2 cursor-pointer rounded-lg transition  ease-in-out duration-150 hover:bg-neutral-200 active:scale-90 " onClick={handleClick}>
            <div className="w-3/4 flex flex-row items-center font-poppins space-x-1">
                <CiCalendar size={25}/>
                <h1 className="w-3/4 font-poppins truncate">Calendar { index+1 }</h1>
                <h1 className="font-poppins"></h1>
            </div>
            <MdDownload size={25} onClick={downloadIcs}/> 
        </div>
    )
}