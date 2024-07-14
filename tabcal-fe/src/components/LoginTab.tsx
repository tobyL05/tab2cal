import { login } from "../../utils/auth";
import { useUserStore } from "../store/UserStore";
import { Button } from "./UI/Button";

export default function LoginTab() {
    const setUser = useUserStore((state) => state.setUser)
    const setCreds = useUserStore((state) => state.setCreds)
    
    return (
        <div className="w-full mx-auto mt-10 flex flex-col justify-evenly items-center align-middle">
            <h1 className="my-5 text-center">login to google to access your previous calendars</h1>
            <Button className="bg-blue-500 text-white p-4" onClick={() => login(setUser, setCreds)}>
                login with google
            </Button>
        </div>
    )
}