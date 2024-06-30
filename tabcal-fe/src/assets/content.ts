
type option = {
    value: string
    label: string
}

const repeatOptions: option[] = [
    {
        value: "none",
        label: "none"
    },
    {
        value: "weekly",
        label: "weekly"
    },
    {
        value: "weekly until",
        label: "weekly until set date"
    }
]

export { repeatOptions }