import { Dispatch, SetStateAction, useState } from "react";
import { Combobox } from "./UI/Combobox";
import { repeatOptions } from "../assets/content";
import { DatePicker } from "./UI/Datepicker/DatePicker";


export default function Options() {
    const [repeat, setRepeat] = useState<string>("");

    return ( 
        <div className="md:text-md lg:text-lg">
            {/* might not need this */}
            {/* <div className="w-full flex flex-col space-y-2 align-start py-2 grow">
                <h1>time zone</h1>    
                <Combobox placeholder="select timezone" options={timezones} callback={setTimezone}/> 
            </div>        */}
            <div className="w-full flex flex-col space-y-2 align-start py-2 grow">
                <h1>repeat?</h1>
                <div className="flex flex-col items-start space-y-2">
                    <Combobox placeholder="repeat?" options={repeatOptions} callback={setRepeat}/>
                    {repeat == "weekly until" ? 
                        <div className="w-full">
                            <DatePicker /> 
                        </div>
                        : <></>}
                </div>
            </div>
            <div className="my-10"/>
        </div> 
    )
}