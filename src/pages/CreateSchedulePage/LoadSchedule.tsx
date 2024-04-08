import DaySummary from "@/components/DaySummary/DaySummary"
import { CardInfo } from "@/components/HorizontalCard/HorizontalCard"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import { Avatar, Box, Button, Card, CardBody, CardHeader, Checkbox, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { LoadScheduleProps, placeObject } from "./type"

// Recoil
import { useSetRecoilState } from "recoil"
import { placesByDateState } from "../../hooks/atom"

const LoadSchedule: React.FC<LoadScheduleProps> = ({ activeIndex }) => {
  const [showLikeSchedule, setShowLikeSchedule] = useState<boolean>(true)

  // 선택한 하위 일정의 index 변수
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  // 하위 일정에서 어느 스케줄을 선택할지에 대한 index 변수
  const [checkedSchedule, setCheckedSchedule] = useState<number>(-1)

  const setPlacesByDate = useSetRecoilState(placesByDateState)

  // 임시 Object
  const sampleObject: placeObject = {
    kakaoPlaceId: "",
    placeName: "태종대 1",
    latitude: 1,
    longitude: 1,
    address: "",
    memo: "",
    cost: 0,
    visitTime: ""
  }

  const detailScheduleArray: placeObject[][] = [
    [sampleObject, sampleObject, sampleObject, sampleObject],
    [sampleObject, sampleObject, sampleObject, sampleObject],
    [sampleObject, sampleObject, sampleObject, sampleObject]
  ]

  const cardList = [
    {
      title: "OO이랑 떠나는 부산 여행",
      tags: ["커플여행", "관광", "휴식", "바다여행"],
      destinations: [
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"]
      ],
      detailSchedule: detailScheduleArray
    },
    {
      title: "가족 여행",
      tags: ["관광", "휴식", "바다여행"],
      destinations: [
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"]
      ],
      detailSchedule: detailScheduleArray
    },
    {
      title: "바다 여행",
      tags: ["커플여행", "관광", "휴식", "바다여행"],
      destinations: [
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"]
      ],
      detailSchedule: detailScheduleArray
    },
    {
      title: "여행",
      tags: ["커플여행", "관광", "휴식", "바다여행"],
      destinations: [
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"],
        ["태종대", "태종대 2", "태종대 3", "태종대 4"]
      ],
      detailSchedule: detailScheduleArray
    }
  ]

  function detailScheduleClickHandler(index: number) {
    setShowLikeSchedule(false)
    setSelectedIndex(index)
  }

  function returnButtonClickHandler() {
    setShowLikeSchedule(true)
    setSelectedIndex(-1)
    setCheckedSchedule(-1)
  }

  function checkClickEvent(index: number) {
    if (checkedSchedule !== -1 && checkedSchedule === index) {
      setCheckedSchedule(-1)
    } else {
      setCheckedSchedule(index)
    }
  }

  function setPlaces() {
    if (checkedSchedule !== -1 && activeIndex !== -1) {
      setPlacesByDate(prev => ({ ...prev, [activeIndex]: cardList[selectedIndex]["detailSchedule"][checkedSchedule] }))
    }
  }

  // 다른 일정에서 불러오기를 누르면 초기화
  useEffect(() => {
    setShowLikeSchedule(true)
    setSelectedIndex(-1)
    setCheckedSchedule(-1)
  }, [activeIndex])

  return (
    <Card width="600px">
      {showLikeSchedule && (
        <>
          <CardHeader fontSize="18px" fontWeight="700">
            <Text>좋아요한 일정</Text>
          </CardHeader>
          <CardBody display="flex" pl="10px" pr="10px" flexWrap="wrap">
            {cardList.map((item, dateIndex) => (
              <Card
                display="flex"
                flexDirection="column"
                key={dateIndex}
                width="280px"
                padding="0 0 10px 10px"
                margin="0 0 10px 10px"
                cursor="pointer"
                onClick={() => detailScheduleClickHandler(dateIndex)}
              >
                <CardInfo title={item["title"]} ml_size="0px" />
                <TagBox>
                  {item["tags"].map((tag, index) => (
                    <TagStyle key={index}>{tag}</TagStyle>
                  ))}
                </TagBox>
              </Card>
            ))}
          </CardBody>
        </>
      )}

      {!showLikeSchedule && (
        <>
          <CardHeader
            display="flex"
            flexWrap="wrap"
            flexDirection="column"
            fontSize="18px"
            fontWeight="700"
            height="150px"
            align-items="center"
          >
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <Button
                  mt="25px"
                  mr="10px"
                  width="40px"
                  height="40px"
                  borderRadius="20px"
                  color="white"
                  backgroundColor="lightgray"
                  onClick={returnButtonClickHandler}
                >
                  {"<"}
                </Button>
                <CardInfo title={cardList[selectedIndex]["title"]} ml_size="0px" />
              </Box>
              <Avatar
                mt="25px"
                src="https://plus.unsplash.com/premium_photo-1661963130289-aa70dd516940?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </Box>
            <TagBox>
              {cardList[selectedIndex]["tags"].map((tag, index) => (
                <TagStyle key={index}>{tag}</TagStyle>
              ))}
            </TagBox>
          </CardHeader>
          <CardBody display="flex" flexWrap="wrap">
            {cardList[selectedIndex]["destinations"].map((item, index) => (
              <Box display="flex" key={index}>
                <DaySummary selectedDay={`Day ${index + 1}`} destinations={item} size="lg" />
                <Checkbox
                  isChecked={checkedSchedule === index}
                  onChange={() => checkClickEvent(index)}
                  ml="-36px"
                  mt="6px"
                ></Checkbox>
              </Box>
            ))}
          </CardBody>
          <Box display="flex" justifyContent="end" mt="10px" mb="10px" mr="30px">
            <Button
              _hover={{ bg: "secondary", color: "#fff" }}
              backgroundColor="primary"
              color="#fff"
              size="sm"
              height="40px"
              onClick={setPlaces}
            >
              선택 완료
            </Button>
          </Box>
        </>
      )}
    </Card>
  )
}

export default LoadSchedule
