import FileUpload from "./FileUpload";
import useDevice from "../hooks/hooks";
import Options from "./Options";
import { Button } from "./UI/Button";
import {  useContext, useEffect, useState } from "react";
import { EndRepeatDateContext } from "../contexts/endRepeatDateContext";
import { ImageContext } from "../contexts/ImageContext";

export default function Inputs({ toggle } : { toggle: () => void }) {
    const device = useDevice()

    const { imageb64, setImageb64} = useContext(ImageContext) 
    const { endRepeatDate, setEndRepeatDate } = useContext(EndRepeatDateContext)

    useEffect(() => {
        console.log("imgb64: " + imageb64);
    },[imageb64])

    useEffect(() => {
        console.log("end repeat on: " + endRepeatDate);
    },[endRepeatDate])

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
            {device.width < 768 ? 
            <div className="flex flex-row items-center space-x-4">
                <Button className="w-full my-5 bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={()=>{}}>generate</Button>
                <Button className="w-full rounded-lg text-white p-2 bg-blue-500" onClick={toggle}>view calendar</Button> 
            </div>
            :
            <div className="">
                <Button className="w-full my-5 bg-blue-500 text-white hover:bg-blue-600 transition duration-100 ease-in-out" onClick={()=>{}}>generate</Button>
            </div>
            }
        </>
    )
}