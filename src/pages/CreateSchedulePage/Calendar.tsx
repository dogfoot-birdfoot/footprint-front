import { Box, Button } from "@chakra-ui/react"
import "react-day-picker/dist/style.css"
import { format, parse, isValid, isAfter, isBefore } from "date-fns"
import React, { ChangeEvent, useState } from "react"
import { DateFormatter, DateRange, DayPicker, SelectRangeEventHandler } from "react-day-picker"

// 계절에 따른 이모지를 매핑하는 객체
const seasonEmoji: Record<string, string> = {
  winter: "⛄️",
  spring: "🌸",
  summer: "🌻",
  autumn: "🍂"
}

// 주어진 월에 대한 계절을 반환하는 함수
const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth()
  if (monthNumber >= 0 && monthNumber < 3) return "winter"
  if (monthNumber >= 3 && monthNumber < 6) return "spring"
  if (monthNumber >= 6 && monthNumber < 9) return "summer"
  else return "autumn"
}

// 캘린더 상단의 월 표시 포맷을 정의하는 함수
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

// 캘린더 커스텀 CSS
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    background-color: #10bbd5;
    color: #fff;
  }
  .my-selected:hover:not([disabled]) { 
    background-color: #10bbd5;
    color: #fff;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: #1C90C1;
  }
`

// Calendar 컴포넌트 정의
const Calendar: React.FC<{ updateSelectedDates: (dates: Date[]) => void }> = ({ updateSelectedDates }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>() // 사용자가 선택한 날짜 범위 상태
  const [fromValue, setFromValue] = useState<string>("") // 시작 날짜 입력 필드의 값
  const [toValue, setToValue] = useState<string>("") // 종료 날짜 입력 필드의 값

  // 시작 날짜 입력 필드 변경 시 호출되는 함수
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

  // 종료 날짜 입력 필드 변경 시 호출되는 함수
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

  // 시작 날짜와 종료 날짜 사이의 모든 날짜를 배열로 반환하는 함수
  const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
  }

  // 날짜 범위 선택 시 호출되는 이벤트 핸들러
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
    if (range?.from && range.to) {
      const allDates = getDatesInRange(range.from, range.to) // 선택된 날짜 범위 내의 모든 날짜 계산
      updateSelectedDates(allDates) // 부모 컴포넌트에 날짜 배열 업데이트
    }
  }

  // 컴포넌트 렌더링
  return (
    <>
      <style>{css}</style>
      <Box>
        <DayPicker
          formatters={{ formatCaption }}
          mode="range"
          selected={selectedRange}
          onSelect={handleRangeSelect}
          modifiersClassNames={{
            selected: "my-selected",
            today: "my-today"
          }}
          modifiersStyles={{
            disabled: { fontSize: "75%" }
          }}
        />
        <Box display="flex" justifyContent="center">
          <form>
            <Button backgroundColor="#fff" border="1px solid #CBD5E0" borderRadius="20px">
              <input size={11} placeholder="From Date" value={fromValue} onChange={handleFromChange} />
              {"~"} <input size={11} placeholder="To Date" value={toValue} onChange={handleToChange} />
            </Button>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Calendar
