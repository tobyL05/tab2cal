
import { OAuthCredential, User } from "firebase/auth"
import { create } from "zustand"

interface UserInterface {
    user: User | undefined
    credential: OAuthCredential | undefined
    setUser: (newUser: User) => void
    setCreds: (creds: OAuthCredential) => void
}

const useUserStore = create<UserInterface>()((set) => ({
    user: undefined,
    credential: undefined,
    setUser: (newUser: User) => set(() => ({user: newUser})),
    setCreds: (creds: OAuthCredential) => set(() => ({credential: creds}))
}))

export { useUserStore }