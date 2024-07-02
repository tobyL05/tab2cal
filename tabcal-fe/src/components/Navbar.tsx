import { BsCalendar3, BsInfoSquare } from 'react-icons/bs'
import { type ClassValue } from 'clsx'
import { merge } from '../../utils/tw-merge'
import useDevice from '../hooks/hooks';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./UI/Dialog"
import { Button } from './UI/Button';

export default function Navbar({ className } : { className? : ClassValue}) {
    const device = useDevice();

    return (
            <div className={merge(className,"")}>
                <div className="w-full px-10 md:px-4 flex flex-row md:flex-col align-bottom items-baseline justify-between md:space-y-4 py-5 md:py-10">
                    <div className="w-fit flex flex-row align-bottom items-baseline border-primary md:ml-0">
                        <h1 className="text-3xl font-poppins font-bold mr-1">{device.width < 768 ? "tab2cal" : "t2c" }</h1>
                        <BsCalendar3 size={25}/>
                    </div>
                    <div className="w-fit md:w-full flex flex-row items-center justify-evenly rounded-lg p-2 cursor-pointer transition delay-75 duration-200 ease-in-out hover:bg-blue-500 hover:text-white">
                        <Dialog>
                            <DialogTrigger>
                                <BsInfoSquare size={25} />
                            </DialogTrigger>
                            <DialogContent className="bg-slate-200 text-black font-poppins">
                                <DialogHeader>
                                <DialogTitle>about!</DialogTitle>
                                <DialogDescription className="font-bold">
                                    turn images into universal calendar files.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="">
                                    <h1>at the moment, this webapp is a proof-of-concept and is extremely slow (up to 10 seconds to generate a file).</h1>
                                    <h1 className="mt-3">how do i use this?</h1>
                                    <ol className="ml-3">
                                        <li>1. upload an image containing schedule/event information</li>
                                        <li>2. choose how these events repeat under settings</li>
                                        <li>3. generate an ics file and download it</li>
                                        <li>4. import the ics file to your calendar software of choice</li>
                                    </ol>
                                </div>
                                
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button" className="bg-blue-500 text-white">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent> 
                        </Dialog>
                        
                    </div>
                </div>
            </div>
    )
}