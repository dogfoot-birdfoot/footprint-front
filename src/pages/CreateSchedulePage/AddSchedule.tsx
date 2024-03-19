import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  Input,
  Text
} from "@chakra-ui/react"
import React, { forwardRef, useEffect, useState } from "react"
import { IndexStyle } from "../ScheduleDetailPage/ScheduleDetailPage.style"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { AddScheduleProps, Amounts } from "./type"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// 날짜 포맷 함수
const formatDate = (date: Date) => {
  // "3월 19일 (화)"와 같은 형식으로 날짜를 포맷
  return format(date, "M월 d일 (EEE)", { locale: ko })
}

const AddSchedule: React.FC<AddScheduleProps> = ({
  dates,
  setSelectedResults,
  selectedPlaces,
  placesByDate,
  setPlacesByDate,
  showSearchBox,
  setShowSearchBox,
  showLoadSchedule,
  setShowLoadSchedule,
  activeIndex,
  setActiveIndex
}) => {
  // "장소 추가" 버튼 클릭 핸들러, 날짜 인덱스를 인자로 받음
  const handleAddPlaceClick = (dateIndex: number) => {
    // SearchBox 비활성화, LoadSchedule 활성화 시 or 다른 일정 검색창 활성화
    if (showLoadSchedule || activeIndex === -1 || (showSearchBox === true && dateIndex !== activeIndex)) {
      setShowLoadSchedule(false)
      setShowSearchBox(true)
      setActiveIndex(dateIndex)
      setSelectedResults(placesByDate[dateIndex] ? placesByDate[dateIndex] : [])
    }
    // 같은 일정의 장소추가 버튼을 누르면 닫음(값 초기화)
    else if (dateIndex === activeIndex) {
      setShowSearchBox(false)
      setActiveIndex(-1)
      setSelectedResults([])
    }
  }

  const handleLoadScheduleClick = (dateIndex: number) => {
    if (showSearchBox || activeIndex === -1 || (showLoadSchedule === true && dateIndex !== activeIndex)) {
      // SearchBox 활성화, LoadSchedule 비활성화 시 or 다른 일정 불러오기 창 활성화
      setShowLoadSchedule(false)
      setShowLoadSchedule(true)
      setShowSearchBox(false)
      setActiveIndex(dateIndex)
    } else if (dateIndex === activeIndex) {
      // 같은 일정의 일정 불러오기 버튼을 누르면 닫음(값 초기화)
      setShowLoadSchedule(false)
      setActiveIndex(-1)
    }
    setShowSearchBox(false)
  }

  // SearchBox에서 선택완료 버튼을 누를 시, 활성화된 날짜에 대한 장소들 업데이트
  useEffect(() => {
    if (activeIndex !== -1) {
      setPlacesByDate(prev => ({
        ...prev,
        [activeIndex]: selectedPlaces
      }))
    }
  }, [selectedPlaces])

  const editableProps = {
    width: "380px",
    height: "100px",
    fontSize: "13px",
    whiteSpace: "pre-wrap",
    padding: "5px 5px 5px 5px"
  }
  const [amounts, setAmounts] = useState<Amounts>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, dateIndex: number, placeIndex: number) => {
    const { value } = e.target
    // 숫자만 추출 (쉼표, 비숫자 제거)
    const numericValue = value.replace(/[^0-9]/g, "")
    // 숫자를 한국식 금액 형식으로 변환
    const formattedValue = new Intl.NumberFormat("ko-KR").format(Number(numericValue))

    // amounts 상태 업데이트
    setAmounts(prevAmounts => ({
      ...prevAmounts,
      [`${dateIndex}-${placeIndex}`]: formattedValue
    }))
  }

  const [formTimes, setFormTimes] = useState<Record<string, Date>>({}) // 상태의 타입을 string 기반의 키로 변경

  const handleTimeChange = (dateKey: string, date: Date) => {
    setFormTimes(prevTimes => ({
      ...prevTimes,
      [dateKey]: date
    }))
  }
  // 커스텀 DatePicker 입력 컴포넌트
  const CustomInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <Button onClick={onClick} ref={ref} size="sm">
        {value || "시간 선택"}
      </Button>
    )
  )

  CustomInput.displayName = "CustomInput"

  return (
    <>
      {dates.map((date, dateIndex) => (
        <Box key={dateIndex} mt="10px" ml="-10px">
          <Card fontSize="15px" fontWeight="bold" ml="1">
            <CardHeader display="flex" justifyContent="space-between">
              <Box display="flex">
                <IndexStyle>Day {dateIndex + 1}</IndexStyle>
                <Heading size="sm" ml="2">
                  {formatDate(date)}
                </Heading>
              </Box>
            </CardHeader>
            <CardBody mt="-30px">
              {placesByDate[dateIndex]?.map((place, placeIndex) => (
                <Card key={`${dateIndex}-${placeIndex}`} mt="4">
                  <CardBody>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text display="flex">
                        <IndexStyle>{placeIndex + 1}</IndexStyle>
                        <Text>{place}</Text>
                      </Text>
                      <Flex alignItems="center">
                        <Text mr="2">도착시간:</Text>
                        <DatePicker
                          selected={formTimes[`${dateIndex}-${placeIndex}`]}
                          onChange={(date: Date) => handleTimeChange(`${dateIndex}-${placeIndex}`, date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          dateFormat="h:mm aa"
                          customInput={<CustomInput />}
                        />
                      </Flex>
                    </Flex>
                    <Box mt="4">
                      <Editable
                        {...editableProps}
                        defaultValue="메모입력"
                        border="1px solid lightgray"
                        borderRadius="10px"
                      >
                        <EditablePreview />
                        <EditableTextarea resize="none" maxLength={300} />
                      </Editable>
                    </Box>
                    <Flex mt="4" alignItems="center">
                      <Text>예상경비:</Text>
                      <Input
                        ml="2"
                        width="290px"
                        placeholder="예상경비를 입력하세요."
                        value={amounts[`${dateIndex}-${placeIndex}`] || ""}
                        onChange={e => handleChange(e, dateIndex, placeIndex)}
                      />
                      <Text ml="2">원</Text>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </CardBody>
          </Card>
          <Flex justifyContent="space-between" mt="10px">
            <Button
              _hover={{ bg: "secondary", color: "#fff" }}
              size="sm"
              width="200px"
              height="30px"
              onClick={() => handleAddPlaceClick(dateIndex)}
            >
              장소추가
            </Button>
            <Button
              _hover={{ bg: "secondary", color: "#fff" }}
              size="sm"
              width="200px"
              height="30px"
              display="flex"
              justifyContent="center"
              onClick={() => handleLoadScheduleClick(dateIndex)}
            >
              일정 불러오기
            </Button>
          </Flex>
        </Box>
      ))}
    </>
  )
}

export default AddSchedule
