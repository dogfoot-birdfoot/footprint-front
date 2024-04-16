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
import React, { forwardRef, useState } from "react"
import { IndexStyle } from "../ScheduleDetailPage/ScheduleDetailPage.style"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { AddScheduleProps, Amounts } from "./type"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { currentKeywords, allDates, placesByDateState } from "../../hooks/atom"

// 날짜 포맷 함수
const formatDate = (date: Date) => {
  return format(date, "M월 d일 (EEE)", { locale: ko }) // "3월 19일 (화)" 형식
}

const AddSchedule: React.FC<AddScheduleProps> = ({
  showSearchBox,
  setShowSearchBox,
  showLoadSchedule,
  setShowLoadSchedule,
  activeIndex,
  setActiveIndex
}) => {
  const [amounts, setAmounts] = useState<Amounts>({})
  const [formTimes, setFormTimes] = useState<Record<string, Date>>({})

  const setSelectedKeywords = useSetRecoilState(currentKeywords)
  const selectedDates = useRecoilValue(allDates)
  const [placesByDate, setPlacesByDate] = useRecoilState(placesByDateState)

  const editableProps = {
    width: "370px",
    marginTop: "10px",
    fontSize: "13px",
    whiteSpace: "pre-line",
    padding: "10px 10px 10px 10px"
  }

  const handleAddPlaceClick = (dateIndex: number) => {
    if (showLoadSchedule || activeIndex === -1 || (showSearchBox === true && dateIndex !== activeIndex)) {
      setShowLoadSchedule(false)
      setShowSearchBox(true)
      setActiveIndex(dateIndex)
      setSelectedKeywords(placesByDate[dateIndex] ? placesByDate[dateIndex] : [])
    } else if (showSearchBox && dateIndex === activeIndex) {
      setShowSearchBox(false)
      setActiveIndex(-1)
      setSelectedKeywords([])
    }
  }

  const handleLoadScheduleClick = (dateIndex: number) => {
    if (showSearchBox || activeIndex === -1 || (showLoadSchedule === true && dateIndex !== activeIndex)) {
      setShowLoadSchedule(true)
      setShowSearchBox(false)
      setActiveIndex(dateIndex)
    } else if (dateIndex === activeIndex) {
      setShowLoadSchedule(false)
      setActiveIndex(-1)
    }
    setShowSearchBox(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, dateIndex: number, placeIndex: number) => {
    const { value } = e.target
    const numericValue = value.replace(/[^0-9]/g, "")
    const formattedValue = new Intl.NumberFormat("ko-KR").format(Number(numericValue))

    setAmounts(prevAmounts => ({
      ...prevAmounts,
      [`${dateIndex}-${placeIndex}`]: formattedValue
    }))
  }

  const handleTimeChange = (dateIndex: number, placeIndex: number, date: Date) => {
    setFormTimes(prevTimes => ({
      ...prevTimes,
      [`${dateIndex}-${placeIndex}`]: date
    }))

    const formattedTime = format(date, "HH:mm:ss")

    const updatedPlaces = [...placesByDate[dateIndex]]
    const updatedPlace = { ...updatedPlaces[placeIndex], visitTime: formattedTime }
    updatedPlaces[placeIndex] = updatedPlace

    const newPlacesByDate = { ...placesByDate, [dateIndex]: updatedPlaces }
    setPlacesByDate(newPlacesByDate)
  }

  const handlePlaceDetailsUpdate = (
    dateIndex: number,
    placeIndex: number,
    memo?: string,
    cost?: number,
    visitTime?: Date
  ) => {
    const updatedPlacesByDate = { ...placesByDate } // 상위 객체 복사
    const places = [...updatedPlacesByDate[dateIndex]] // 해당 날짜의 장소 배열 복사
    const updatedPlace = { ...places[placeIndex] } // 수정할 장소 객체 복사
    const newPlaceDetails = { ...updatedPlace.placeDetails } // placeDetails 또한 복사

    // 수정 사항 적용
    if (memo !== undefined) {
      newPlaceDetails.memo = memo // 복사된 객체 수정
    }
    if (cost !== undefined) {
      newPlaceDetails.cost = cost // 복사된 객체 수정
    }
    if (visitTime !== undefined) {
      newPlaceDetails.visitTime = visitTime.toISOString().split("T")[0] + " " + visitTime.toTimeString().split(" ")[0] // 복사된 객체 수정
    }

    updatedPlace.placeDetails = newPlaceDetails // 수정된 details로 갱신
    places[placeIndex] = updatedPlace // 배열에 수정된 장소 객체를 다시 할당
    updatedPlacesByDate[dateIndex] = places // 날짜별 장소 데이터를 업데이트된 배열로 갱신

    setPlacesByDate(updatedPlacesByDate) // Recoil 상태 업데이트
  }

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
      {selectedDates.map((date, dateIndex) => (
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
                  <CardBody padding="10px 10px 10px 10px">
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text display="flex">
                        <IndexStyle>{placeIndex + 1}</IndexStyle>
                        <Text>{place["placeName"]}</Text>
                      </Text>
                      <Flex alignItems="center">
                        <Text fontSize="12px" mr="2">
                          도착시간 :
                        </Text>
                        <DatePicker
                          selected={formTimes[`${dateIndex}-${placeIndex}`]}
                          onChange={(date: Date) => handleTimeChange(dateIndex, placeIndex, date)}
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
                        defaultValue={place.placeDetails.memo || "메모 입력"}
                        onSubmit={value => handlePlaceDetailsUpdate(dateIndex, placeIndex, value)}
                      >
                        <EditablePreview height="100%" overflow="hidden" />
                        <EditableTextarea height="100%" rows={3} resize="none" maxLength={100} />
                      </Editable>
                    </Box>
                    <Flex mt="4" alignItems="center" justifyContent="right">
                      <Text>예상경비:</Text>
                      <Input
                        ml="2"
                        width="180px"
                        placeholder="예상경비를 입력하세요."
                        textAlign="right"
                        value={amounts[`${dateIndex}-${placeIndex}`] || ""}
                        onChange={e => {
                          handleChange(e, dateIndex, placeIndex)
                          handlePlaceDetailsUpdate(
                            dateIndex,
                            placeIndex,
                            undefined,
                            Number(e.target.value.replace(/[^0-9]/g, ""))
                          )
                        }}
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
