import { Button } from "@chakra-ui/react"
import { format, parse, isValid, isAfter, isBefore } from "date-fns"
import React, { ChangeEvent, useState } from "react"
import "react-day-picker/dist/style.css"
import { DateFormatter, DateRange, DayPicker, SelectRangeEventHandler } from "react-day-picker"
const seasonEmoji: Record<string, string> = {
  winter: "⛄️",
  spring: "🌸",
  summer: "🌻",
  autumn: "🍂"
}

const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth()
  if (monthNumber >= 0 && monthNumber < 3) return "winter"
  if (monthNumber >= 3 && monthNumber < 6) return "spring"
  if (monthNumber >= 6 && monthNumber < 9) return "summer"
  else return "autumn"
}

const formatCaption: DateFormatter = (month, options) => {
  const season = getSeason(month)
  return (
    <>
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{" "}
      {format(month, "LLLL", { locale: options?.locale })}
    </>
  )
}

const AddCalendar: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [fromValue, setFromValue] = useState<string>("")
  const [toValue, setToValue] = useState<string>("")

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value)
    const date = parse(e.target.value, "y-MM-dd", new Date())
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: selectedRange?.to })
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date })
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to })
    }
  }

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value)
    const date = parse(e.target.value, "y-MM-dd", new Date())

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined })
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from })
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date })
    }
  }

  const handleRangeSelect: SelectRangeEventHandler = (range: DateRange | undefined) => {
    setSelectedRange(range)
    if (range?.from) {
      setFromValue(format(range.from, "y-MM-dd"))
    } else {
      setFromValue("")
    }
    if (range?.to) {
      setToValue(format(range.to, "y-MM-dd"))
    } else {
      setToValue("")
    }
  }

  return (
    <>
      <DayPicker
        formatters={{ formatCaption }}
        mode="range"
        selected={selectedRange}
        onSelect={handleRangeSelect}
        numberOfMonths={2}
        footer={
          <form>
            <Button>
              <input size={10} placeholder="From Date" value={fromValue} onChange={handleFromChange} />
              {" ~ "}
              <input size={10} placeholder="To Date" value={toValue} onChange={handleToChange} />
            </Button>
          </form>
        }
      />
    </>
  )
}

export default AddCalendar
