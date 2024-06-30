import { create } from 'zustand'

interface options {
    imgb64: string | undefined
    repeatMode: string | undefined
    endRepeatDate: string | undefined
    setImgB64: (newImgb64: string) => void
    setRepeatMode: (newRepeatMode: string) => void
    setEndRepeatDate: (newEndRepeatDate: string | undefined) => void
}

const useOptionsStore = create<options>()((set) => ({
    imgb64: undefined,
    repeatMode: undefined,
    endRepeatDate: undefined,
    setImgB64: (newImgb64: string) => set(() => ({imgb64: newImgb64})),
    setRepeatMode: (newRepeatMode: string) => set(() => ({repeatMode: newRepeatMode})),
    setEndRepeatDate: (newEndRepeatDate: string | undefined) => set(() => ({endRepeatDate: newEndRepeatDate}))
}))

export { useOptionsStore }
