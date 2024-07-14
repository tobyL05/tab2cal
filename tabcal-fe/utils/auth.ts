import { signInWithPopup, GoogleAuthProvider, OAuthCredential, User, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../.secrets/firebase";
import { toast } from "../src/components/UI/Toast/Use-toast";
import { checkUserAlreadyExists, getUser, addUser } from "./firestore";
import { UserDocument } from "../src/types/firestore";

const login = async (setUser: (user: UserDocument) => void, setCreds: (creds: OAuthCredential) => void): Promise<void> => {
    try{
        const signInResult = await signInWithPopup(auth, googleAuthProvider)
        const credential = GoogleAuthProvider.credentialFromResult(signInResult)
        if (credential) {
            if (await checkUserAlreadyExists(signInResult.user.uid)) {
                // existing user
                setUser(await getUser(signInResult.user.uid) as UserDocument)
            } else {
                // new user
                const newUser = await addUser(signInResult.user)
                if (newUser) {
                    setUser(newUser) 
                    setCreds(credential)
                } else {
                    // new user wasn't added to firestore for some reason
                    throw Error()
                }
            }
        }
    } catch (error) {
        toast({
            title: "an error occurred signing in",
            description: "please try again",
            className: "bg-red-500 text-white font-poppins"
        })
    }
}

const logout = async() => {
    await signOut(auth)
    console.log("sign out successful")
    window.location.reload()
}

export { login, logout }