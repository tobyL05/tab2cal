import { BsCalendar3 } from 'react-icons/bs'
import { type ClassValue } from 'clsx'
import { merge } from '../../utils/tw-merge'
import useDevice from '../hooks/hooks';
import Info from './Info';
import Login from './LoginToast';
import { useUserStore } from '../store/UserStore';
import Profile from './Profile';

export default function Navbar({ className } : { className? : ClassValue}) {
    const device = useDevice();

    const user = useUserStore((state) => state.user)

    return (
            <div className={merge(className,"")}>
                <div className="w-full px-10 md:px-4 flex flex-row md:flex-col align-bottom items-center justify-between md:space-y-4 py-5 md:py-10">
                    <div className="w-fit flex flex-row align-bottom items-baseline border-primary md:ml-0">
                        <h1 className="text-3xl font-poppins font-bold mr-1">{device.width < 768 ? "tab2cal" : "t2c" }</h1>
                        <BsCalendar3 size={25}/>
                    </div>
                    <div className="flex flex-row md:flex-col md:space-x-0 space-x-4 md:space-y-4">
                        {/* <div className="w-fit md:w-full flex flex-row items-center justify-evenly"> */}
                            <Info /> 
                        {/* </div> */}
                        <div className="w-fit md:w-full flex flex-row items-center justify-evenly rounded-lg p-2 cursor-pointer transition duration-200 ease-in-out hover:translate-x-1 hover:-translate-y-1">
                            {user ? <Profile /> : <Login /> }
                        </div>
                    </div>
                </div>
            </div>
    )
}