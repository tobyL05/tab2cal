import { Combobox } from "./UI/Combobox";
import { DatePicker } from "./UI/Datepicker/DatePicker";
import { useOptionsStore } from "../store/OptionsStore";
import { useEffect } from "react";

const repeatOptions: { value: string, label: string }[] = [
    {
        value: "none",
        label: "none"
    },
    {
        value: "weekly",
        label: "weekly"
    },
    {
        value: "weekly until",
        label: "weekly until set date"
    }
]

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