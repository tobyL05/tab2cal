import Dropzone from "react-dropzone"
import { type ClassValue } from "clsx"
import { merge } from '../../utils/tw-merge'
import { FiUpload } from "react-icons/fi"
import { useState } from "react"
import { toast } from "./UI/Toast/Use-toast"
import { useOptionsStore } from "../store/OptionsStore"

export default function FileUpload( { className } : { className? : ClassValue}) {
    // const { imageb64, setImageb64 } = useContext(ImageContext);
    const [filename, setFilename] = useState<string>("");
    const [uploaded, setUploaded] = useState<boolean>(false);

    const setImgB64 = useOptionsStore((state) => state.setImgB64)

    function checkFiles(input: File[]) {
        const file: File = input[0]

        if (input.length > 1) {
            // console.log("please upload one file")
            toast({
                title: "upload error!",
                description: "please upload only one file.",
                className: "bg-red-500 text-white font-poppins"
            })
            return 
        }

        if (!file.type.includes("image")) {
            toast({
                title: "upload error!",
                description: "please upload images only.",
                className: "bg-red-500 text-white font-poppins"
            })
            return
        }
        
        if (file) {
            // console.log(file.type)
            setFilename(file.name)
            toast({
                title: "upload Successful",
                description: "uploaded: " + file.name.toLowerCase(),
                className: "bg-green-500 text-white font-poppins"
            })
            setUploaded(true);
            const reader = new FileReader()
            let imgb64;
            reader.readAsDataURL(file);
            reader.onload = () => {
                imgb64 = reader.result
                setImgB64(imgb64 as string);
                // setImageb64(imgb64 as string)
                // fetch("http://localhost:3000/upload", {
                //     method: "POST",
                //     headers:{
                //         'Content-type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         'image': imgb64
                //     })
                // });
                console.log("file uploaded")
            }
        }
    }

    return (
        <div className={merge(className)}>
            <Dropzone onDrop={checkFiles}>
                {({getRootProps, getInputProps}) => (
                    <section className="">
                    <div className="w-full flex flex-col align-middle items-center bg-blue-500 p-14 h-shadow-inner text-white rounded-lg hover:bg-blue-700" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="">
                            <FiUpload size={20} />
                            {/* <p className="text-lg text-center">drop/upload your images here</p>
                            <p className="text-md text-center">(images only)</p> */}
                        </div>
                    </div>
                    </section>
                )}
            </Dropzone>
            {uploaded ? <h1 className="text-sm truncate">uploaded {filename.toLowerCase()}</h1> : null}
        </div>
    )
}