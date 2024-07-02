import { Combobox } from "./UI/Combobox";
import { repeatOptions } from "../assets/content";
import { DatePicker } from "./UI/Datepicker/DatePicker";
import { useOptionsStore } from "../store/OptionsStore";
import { useEffect } from "react";


export default function Options() {
    const repeatMode = useOptionsStore((state) => state.repeatMode);
    const endRepeatDate = useOptionsStore((state) => state.endRepeatDate);
    const setRepeatMode = useOptionsStore((state) => state.setRepeatMode);
    // const setTz = useOptionsStore((state) => state.setTz);
    const setEndRepeatDate = useOptionsStore((state) => state.setEndRepeatDate);

    useEffect(() => {
        if (repeatMode != "weekly until" && endRepeatDate) {
            setEndRepeatDate(undefined)
        }
    },[repeatMode])

    return ( 
        <div className="md:text-md lg:text-lg">
            {/* might not need this */}
            {/* <div className="w-full flex flex-col space-y-2 align-start py-2 grow">
                <h1>time zone</h1>    
                <Combobox placeholder="select timezone" options={timezones} callback={setTz}/> 
            </div>        */}
            <div className="w-full flex flex-col space-y-2 align-start py-2 grow">
                <h1>repeat?</h1>
                <div className="flex flex-col items-start space-y-2">
                    <Combobox placeholder="repeat?" options={repeatOptions} callback={setRepeatMode}/>
                    {repeatMode == "weekly until" ? 
                        <div className="w-full">
                            <DatePicker setEndRepeatDate={setEndRepeatDate} /> 
                        </div>
                        : <></>}
                </div>
            </div>
            <div className="my-10"/>
        </div> 
    )
}