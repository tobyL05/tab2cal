import { Tabs, TabsContent, TabsList, TabsTrigger } from "./UI/Tabs"
import { MdEditCalendar } from "react-icons/md"
import { LuSave } from "react-icons/lu"
import Inputs from "./Inputs"
import { useUserStore } from "../store/UserStore"
import LoginTab from "./LoginTab"

export default function InputTabs({ toggle } : { toggle: () => void }) {
    const user = useUserStore((state) => state.user)

    return (
        <Tabs defaultValue="generate" className="">
            <TabsList className="grid w-full grid-cols-2 shadow-md shadow-slate-200 rounded-lg">
                <TabsTrigger className="transition duration-100 ease-in-out group ring-blue-400 ring-offset-4 active:ring-4 rounded-lg mx-2" value="generate"><MdEditCalendar className="group-active:scale-90" size={20}/></TabsTrigger>
                <TabsTrigger className="transition duration-100 ease-in-out group ring-blue-400 ring-offset-4 active:ring-4 rounded-lg mx-2" value="recent"><LuSave className="group-active:scale-90" size={20}/></TabsTrigger>
            </TabsList>
            <TabsContent value="generate">
                <Inputs toggle={toggle}/>
            </TabsContent>
            <TabsContent value="recent">
                {user ? <h1>recent</h1> : <LoginTab />}
            </TabsContent>
        </Tabs>
    )
}
