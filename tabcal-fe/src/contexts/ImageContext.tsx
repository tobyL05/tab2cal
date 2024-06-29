import { ReactNode, Dispatch, SetStateAction, createContext, useState } from "react";

interface imgContext {
    imageb64: string
    setImageb64: Dispatch<SetStateAction<string>>
}

export const ImageContext = createContext<imgContext>({
    imageb64: "",
    setImageb64: () => {}
})

export default function ImageContextProvider({ children } : { children: ReactNode }) {
    const [imageb64, setImageb64] = useState<string>("")

    return (
        <ImageContext.Provider value={{imageb64, setImageb64}}>
            { children }
        </ImageContext.Provider>
    )
    
}

