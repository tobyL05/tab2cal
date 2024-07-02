import FileUpload from "./FileUpload";
import useDevice from "../hooks/hooks";
import Options from "./Options";
import { Button } from "./UI/Button";
import { useOptionsStore } from "../store/OptionsStore";
import { toast } from "./UI/Toast/Use-toast";
import { useCalendarStore } from "../store/CalendarStore";
import Event from "@fullcalendar/react"
import { useState } from "react";
import { ColorRing } from "react-loader-spinner"

export default function Inputs({ toggle } : { toggle: () => void }) {
    const [loading, isLoading] = useState<boolean>(false)

    const device = useDevice()

    const imgb64 = useOptionsStore((state) => state.imgb64)
    const repeatMode = useOptionsStore((state) => state.repeatMode)
    const endRepeatDate = useOptionsStore((state) => state.endRepeatDate);

    const ics = useCalendarStore((state) => state.ics)
    const setIcs = useCalendarStore((state) => state.setIcs)
    const setEventsJson = useCalendarStore((state) => state.setEventsJson)

    function validate() {
        if (!imgb64) {
            toast({
                title: "no image uploaded",
                description: "please upload an image",
                className: "bg-red-500 text-white font-poppins"
            })
            return false
        } else if (!repeatMode) {
            toast({
                title: "no repeat mode selected",
                description: "please select a repeat mode",
                className: "bg-red-500 text-white font-poppins"
            })
            return false
        } else if (repeatMode === "weekly until" && !endRepeatDate) {
            toast({
                title: "no end repeat date select",
                description: "weekly until mode selected. please select a date to end repeat",
                className: "bg-red-500 text-white font-poppins"
            })
            return false
        }
        return true
    }

    async function generateCalendar() {
        // check if all required inputs 
        if (validate()) {
            let req;
            try {
                isLoading(true)
                setEventsJson([])
                if (repeatMode !== "weekly until") {
                    req = await fetch("https://gen-lang-client-0914391112.uw.r.appspot.com/generate", {
                        method: "POST",
                        headers:{
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            'image': imgb64,
                            'repeat': repeatMode
                        })
                    });
                } else {
                    req = await fetch("https://gen-lang-client-0914391112.uw.r.appspot.com/generate", {
                        method: "POST",
                        headers:{
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            'image': imgb64,
                            'repeat': "weekly until",
                            'endRepeatDate': endRepeatDate
                        })
                    });
                }
                const resp = await req.json();
                const events: Event[] = resp.json;
                const ics:string = resp.ics
                setEventsJson(events) // set events
                setIcs(ics) // b64 encoded ics file
                isLoading(false)
                console.log(events)
                // console.log(ics)
            } catch(error) {
                isLoading(false);
                console.log(error)
                toast({
                    title: "an error occurred",
                    description: "uh oh, a network error occurred. check your internet connection or come back later",
                    className: "bg-red-500 text-white font-poppins"
                })
            }
        }
    }

    function download() {
        let fetchDataModified = `data:text/calendar;base64,${ics}`;
        let a = document.createElement("a");
        a.href = fetchDataModified;
        a.download = 'tab2cal.ics';
        a.click();
    }

    return (
        <>
            <div className="">
                <h1 className="md:text-lg lg:text-2xl font-poppins font-bold py-3">upload an image</h1>
                <FileUpload />
            </div>
            <div className="my-4"/>
            <div className="">
                <h1 className="md:text-lg lg:text-2xl font-poppins font-bold py-3">settings</h1>
                <Options />
            </div>
            <div className="my-10"/>
            {device.width < 768 ? 
            <div className="flex flex-row items-center space-x-4">
                <Button className="w-full my-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={generateCalendar} disabled={loading}>
                    generate
                    <ColorRing
                        visible={loading}
                        height="20"
                        width="20"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']}/>
                </Button>
                <Button className="w-full rounded-lg text-white p-2 bg-blue-500" onClick={toggle}>view calendar</Button> 
            </div>
            :
            <div className="">
                <Button className="w-full my-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={generateCalendar} disabled={loading}>
                    generate
                    <ColorRing
                        visible={loading}
                        height="20"
                        width="20"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']}/> 
                </Button>
            </div>
            }
            {ics && !loading ? <Button className="w-full my-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={download}>download .ics</Button> : null}
        </>
    )
}