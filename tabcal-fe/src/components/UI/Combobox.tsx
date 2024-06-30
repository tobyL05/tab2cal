"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { merge } from "../../../utils/tw-merge"
import { Button } from "./Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Popover"
import { Dispatch, SetStateAction } from "react"

type option = {
    value: string
    label: string
}

export function Combobox({ placeholder, options, callback } : { placeholder: string, options: option[], callback: (newRepeatMode: string) => void}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
   
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between">
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 bg-slate-50 shadow-xl">
                <Command>
                    <CommandInput placeholder={placeholder}/>
                    <CommandEmpty>no results</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {options.map((option) => (
                                <CommandItem
                                    className=" hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-lg transition duration-100 ease-in-out"
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        callback(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}>
                                    {option.label}
                                </CommandItem>))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
