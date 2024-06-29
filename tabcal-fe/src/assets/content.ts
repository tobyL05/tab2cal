
type option = {
    value: string
    label: string
}


const timezones: option[] = [
    {
        value: "world",
        label: "hello"
    },
    {
        value: "buzz",
        label: "fizz",
    }
]

const repeatOptions: option[] = [
    {
        value: "no",
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

export { timezones, repeatOptions }