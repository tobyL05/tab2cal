import { getEvents, getIcsDownloadURL } from "../../utils/firestore"
import { useCalendarStore } from "../store/CalendarStore"
import { MdDownload } from "react-icons/md"
import { toast } from "./UI/Toast/Use-toast"

export default function SavedCalendar({ calendarUUID } : { calendarUUID: string }){ 
    const setEventsJson = useCalendarStore((state) => state.setEventsJson)
    async function handleClick() {
        setEventsJson(await getEvents(calendarUUID))
    }

    async function downloadIcs() {
        let a = document.createElement("a");
        // a.href = await getIcsDownloadURL(calendarUUID);
        // a.download = 'tab2cal.ics';
        // a.click();
        toast({
            title: `downloading ${calendarUUID}.ics!`,
            description: "make sure the calendar is correct! sometimes tab2cal generates incorrect results.",
            className: "bg-green-500 font-poppins text-white"
        })
    }

    return (
        <div className="w-full flex flex-row justify-between items-center ring-offset-2 py-4 px-2 cursor-pointer rounded-lg transition delay-75 ease-in-out duration-100 hover:bg-blue-500 hover:text-white active:scale-90 " onClick={handleClick}>
            {/* <CiCalendar size={25}/> */}
            <div className="w-3/4 flex flex-row items-center font-poppins">
                <h1 className="w-3/4 font-poppins truncate">{ calendarUUID }</h1>
                <h1 className="font-poppins">.ics</h1>
            </div>
            <MdDownload size={25} onClick={downloadIcs}/> 
        </div>
    )
}