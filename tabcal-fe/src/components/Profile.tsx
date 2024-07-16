import { logout } from "../../utils/auth";
import { useUserStore } from "../store/UserStore";
import { Button } from "./UI/Button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "./UI/Dialog";
import { CgProfile } from "react-icons/cg"

export default function Profile() {
    const user = useUserStore((state) => state.user) 

    // onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //         return (
    //             <h1>error page</h1>
    //         )
    //     }
    // })

    return (
        <Dialog>
            <DialogTrigger>
                {/* user pfp */}
                { user!.pfp ? <img className="rounded-xl p-1" src={user!.pfp}/> : <CgProfile size={30}/> }
            </DialogTrigger>
            <DialogContent className="bg-slate-200 text-black font-poppins">
                <DialogHeader>
                <DialogTitle className="text-xl">{ user!.displayName }</DialogTitle>
                    <DialogDescription className="font-bold">
                        {/* account created */}
                        created on: { user!.date_created }
                    </DialogDescription>
                </DialogHeader>
                {/* stats? */}
                calendars made: { user!.calendars.length }
                <DialogFooter>
                    <Button onClick={logout}>
                        logout
                    </Button>
                </DialogFooter>
            </DialogContent> 
        </Dialog>
    )
}