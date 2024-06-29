"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { merge } from "../../../../utils/tw-merge"
import { CalendarPicker } from "./CalendarPicker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./../Popover"
import { Button } from "./../Button"
import { Dispatch, SetStateAction } from "react"
import { useToast } from "../Toast/Use-toast"
import { EndRepeatDateContext } from "../../../contexts/endRepeatDateContext"

export function DatePicker() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);
  const { setEndRepeatDate } = React.useContext(EndRepeatDateContext)

  const { toast } = useToast()


  function handleSelect(date: Date | undefined) {
    if (date! > new Date()) {
      setSelectedDate(date)
      setEndRepeatDate(date!.toISOString())
      setCalendarOpen(false)
    } else {
      setCalendarOpen(true)
      toast({
        title: "invalid date!",
        description: "please select a date in the future",
        className: "bg-red-500 text-white font-poppins"
      })
    }
  }

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={merge(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>repeat until?</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 backdrop-blur-2xl" align="center" side="bottom">
        <CalendarPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => handleSelect(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
