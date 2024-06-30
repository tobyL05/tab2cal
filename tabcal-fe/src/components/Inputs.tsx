import FileUpload from "./FileUpload";
import useDevice from "../hooks/hooks";
import Options from "./Options";
import { Button } from "./UI/Button";
import { useOptionsStore } from "../store/OptionsStore";

export default function Inputs({ toggle } : { toggle: () => void }) {
    const device = useDevice()

    const imgb64 = useOptionsStore((state) => state.imgb64)
    const repeatMode = useOptionsStore((state) => state.repeatMode)
    const endRepeatDate = useOptionsStore((state) => state.endRepeatDate);
    // const { imageb64 } = useContext(ImageContext) 
    // const { repeatMode, endRepeatDate } = useContext(RepeatContext)

    async function generateCalendar() {
        // check if all required inputs 
      console.log(imgb64)
      console.log(repeatMode)
      console.log(endRepeatDate)
    }

    
    // useEffect(() => {
    //   console.log(imgb64)
    //   console.log(repeatMode)
    //   console.log(endRepeatDate)
    // },[imgb64, repeatMode, endRepeatDate])


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