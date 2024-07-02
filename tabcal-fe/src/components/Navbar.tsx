import { BsCalendar3 } from 'react-icons/bs'
import { type ClassValue } from 'clsx'
import { merge } from '../../utils/tw-merge'
import useDevice from '../hooks/hooks';

export default function Navbar({ className } : { className? : ClassValue}) {
    const device = useDevice();

    return (
            <div className={merge(className,"flex flex-col align-baseline p-4 py-5 md:py-10")}>
                <div className="flex flex-row items-baseline w-fit border-primary ml-5 md:ml-0">
                    <h1 className="text-3xl font-poppins font-bold mr-1">{device.width < 768 ? "tab2cal" : "t2c" }</h1>
                    <BsCalendar3 size={25}/>
                </div>
            </div>
    )
}