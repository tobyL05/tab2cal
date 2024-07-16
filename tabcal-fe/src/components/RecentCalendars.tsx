import { useUserStore } from "../store/UserStore"
import SavedCalendar from "./SavedCalendar"

export default function RecentCalendars() {
    const user = useUserStore((state) => state.user)

    if (!user!.calendars.length) {
        return (
            <div className="w-full mt-20">
                <h1 className="text-xl text-center font-poppins font-bold">no calendars found</h1>
                <h1 className="text-md text-center font-poppins mt-2">calendars you generate will appear here</h1>
            </div>
        )
    }

    return (
        <div className="">
            <h1 className="text-2xl font-bold font-poppins my-4">recent</h1>
            <div className="w-full flex flex-col items-start space-y-4">
                {user!.calendars.map((calendarUUID: string, index: number) => {
                    return (
                        <SavedCalendar key={index} index={index} calendarUUID={calendarUUID} />
                    )
                })}
            </div>
        </div>
    )
}