import { ReactNode, Dispatch, SetStateAction, createContext, useState } from "react";

interface endRepeatDate {
    endRepeatDate: string | undefined,
    setEndRepeatDate: Dispatch<SetStateAction<string | undefined>>
}

export const EndRepeatDateContext = createContext<endRepeatDate>({
    endRepeatDate: undefined,
    setEndRepeatDate: () => {}
})

export default function EndRepeatDateContextProvider({ children } : { children: ReactNode}) {
    const [endRepeatDate, setEndRepeatDate] = useState<string | undefined>()
    return (
        <EndRepeatDateContext.Provider value={{endRepeatDate, setEndRepeatDate}}>
            { children }
        </EndRepeatDateContext.Provider>
    )
}
