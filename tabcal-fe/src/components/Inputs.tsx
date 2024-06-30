import FileUpload from "./FileUpload";
import useDevice from "../hooks/hooks";
import Options from "./Options";
import { Button } from "./UI/Button";
import { useOptionsStore } from "../store/OptionsStore";
import { toast } from "./UI/Toast/Use-toast";

export default function Inputs({ toggle } : { toggle: () => void }) {
    const device = useDevice()

    const imgb64 = useOptionsStore((state) => state.imgb64)
    const repeatMode = useOptionsStore((state) => state.repeatMode)
    const endRepeatDate = useOptionsStore((state) => state.endRepeatDate);

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
            try {
                if (repeatMode !== "weekly until") {
                    await fetch("http://localhost:3000/upload", {
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
                    await fetch("http://localhost:3000/upload", {
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
            } catch(error) {
                // console.log(error)
                toast({
                    title: "an error occurred",
                    description: "uh oh, a network error occurred. check your internet connection or come back later",
                    className: "bg-red-500 text-white font-poppins"
                })
            }
            // console.log(imgb64)
            // console.log(repeatMode)
            // console.log(endRepeatDate)
        }
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
                <Button className="w-full my-5 bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={generateCalendar}>generate</Button>
                <Button className="w-full rounded-lg text-white p-2 bg-blue-500" onClick={toggle}>view calendar</Button> 
            </div>
            :
            <div className="">
                <Button className="w-full my-5 bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={generateCalendar}>generate</Button>
            </div>
            }
        </>
    )
}