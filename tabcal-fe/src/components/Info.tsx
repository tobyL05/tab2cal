import { BsInfoSquare } from "react-icons/bs";
import { DialogHeader, DialogFooter, DialogTrigger, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "./UI/Dialog";
import { Button } from "./UI/Button";

export default function Info() {

    return (
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
    )
}