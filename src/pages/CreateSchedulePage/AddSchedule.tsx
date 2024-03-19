import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Heading,
  Input,
  Text
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { IndexStyle } from "../ScheduleDetailPage/ScheduleDetailPage.style"
import { FiChevronDown } from "react-icons/fi"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { AddScheduleProps } from "./type"

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
  setShowSearchBox
}) => {
  // "장소 추가" 버튼 클릭 핸들러, 날짜 인덱스를 인자로 받음
  const handleAddPlaceClick = (dateIndex: number) => {
    if (showSearchBox === -1 || (showSearchBox !== -1 && dateIndex !== showSearchBox)) {
      // SearchBox 비활성화 시 or 다른 일정 검색창 활성화
      setShowSearchBox(dateIndex)
      setSelectedResults(placesByDate[dateIndex] ? placesByDate[dateIndex] : [])
    } else if (dateIndex == showSearchBox) {
      // 같은 일정의 장소추가 버튼을 누르면 닫음(값 초기화)
      setShowSearchBox(-1)
      setSelectedResults([])
    }
  }
  const [amount, setAmount] = useState("")

  // SearchBox가 닫히고, 현재 활성화된 날짜가 있을 때 해당 날짜에 대한 장소들 업데이트
  useEffect(() => {
    if (showSearchBox !== -1) {
      setPlacesByDate(prev => ({
        ...prev,
        [showSearchBox]: selectedPlaces
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // 숫자만 추출 (쉼표, 비숫자 제거)
    const numericValue = value.replace(/[^0-9]/g, "")
    // 숫자를 한국식 금액 형식으로 변환
    const formattedValue = new Intl.NumberFormat("ko-KR").format(Number(numericValue))
    setAmount(formattedValue)
  }

  return (
    <>
      {dates.map((date, index) => (
        <Box mt="10px" key={index} ml="-10px">
          <Card fontSize="15px" fontWeight="bold" ml="1">
            <CardHeader display="flex" justifyContent="space-between">
              <Box display="flex">
                <IndexStyle>Day {index + 1}</IndexStyle>
                <Heading size="sm">{formatDate(date)}</Heading>
              </Box>
              <Button size="xs" width="100px" display="flex" justifyContent="space-between">
                <Text ml="4">도착시간</Text>
                <FiChevronDown />
              </Button>
            </CardHeader>
            <CardBody>
              {placesByDate[index]?.map((place, placeIndex) => (
                <Card key={placeIndex}>
                  <Text mt="7px">
                    <Box display="flex">
                      <IndexStyle>{placeIndex + 1}</IndexStyle>
                      {place}
                    </Box>
                  </Text>
                  <Box ml="15px">
                    <Editable
                      width="380px"
                      height="100px"
                      defaultValue="메모입력"
                      border="1px solid lightgray"
                      borderRadius="10px"
                      selectAllOnFocus={false}
                    >
                      <EditablePreview {...editableProps} />
                      <EditableTextarea {...editableProps} resize="none" maxLength={300} />
                    </Editable>
                  </Box>
                  <Box maxW="400px" ml="10px" mt="20px" mb="20px">
                    <Text color="textColor" fontSize="15px" display="flex" alignItems="center">
                      예상경비
                      <Input
                        placeholder="예상경비를 입력하세요."
                        maxW="300px"
                        ml="5px"
                        value={amount}
                        onChange={handleChange}
                      />
                      <Text ml="10px">원</Text>
                    </Text>
                  </Box>
                </Card>
              ))}
            </CardBody>
          </Card>
          <Box display="flex" justifyContent="space-between" mt="10px">
            <Button
              _hover={{ bg: "secondary", color: "#fff" }}
              size="sm"
              width="200px"
              height="30px"
              display="flex"
              justifyContent="center"
              onClick={() => handleAddPlaceClick(index)}
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
            >
              일정 불러오기
            </Button>
          </Box>
        </Box>
      ))}
    </>
  )
}

export default AddSchedule
