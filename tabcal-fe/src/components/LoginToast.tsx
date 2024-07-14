import { Button } from "./UI/Button"
import { CiLogin } from "react-icons/ci"
import { DialogHeader, DialogTrigger, Dialog, DialogContent, DialogDescription, DialogTitle } from "./UI/Dialog";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth"
import { auth, googleAuthProvider } from "../../.secrets/firebase"
import { toast } from "./UI/Toast/Use-toast";
import { useUserStore } from "../store/UserStore";
import { addUser, checkUserAlreadyExists, getUser } from "../../utils/firestore";
import { login } from "../../utils/auth";

export default function Login() {
    const setUser = useUserStore((state) => state.setUser)
    const setCreds = useUserStore((state) => state.setCreds)

    return(
        <Dialog>
            <DialogTrigger>
                <CiLogin size={25} />
            </DialogTrigger>
            <DialogContent className="bg-slate-200 text-black font-poppins">
                <DialogHeader>
                <DialogTitle>login with google</DialogTitle>
                <DialogDescription className="font-bold">
                    to save calendars and export them directly to your google calendar
                </DialogDescription>
                </DialogHeader>
                <Button onClick={() => login(setUser, setCreds)}>
                    login with google
                </Button>
            </DialogContent> 
        </Dialog>
    )
}