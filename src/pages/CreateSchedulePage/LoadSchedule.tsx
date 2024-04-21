import DaySummary from "@/components/DaySummary/DaySummary"
import { CardInfo } from "@/components/HorizontalCard/HorizontalCard"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import { Avatar, Box, Button, Card, CardBody, CardHeader, Checkbox, Flex, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { LoadScheduleProps, bookmarkObject, placeObject } from "./type"

// Recoil
import { useSetRecoilState } from "recoil"
import { placesByDateState } from "../../hooks/atom"
import { useQuery } from "@tanstack/react-query"
import useCustomFetch from "@/hooks/useCustomFetch"
import { TravelPlan } from "../ScheduleSharePage/type"

const LoadSchedule: React.FC<LoadScheduleProps> = ({ activeIndex }) => {
  const [showBookmarkSchedule, setShowBookmarkSchedule] = useState<boolean>(true)

  // 선택한 하위 일정의 index 변수
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  // 하위 일정에서 어느 스케줄을 선택할지에 대한 index 변수
  const [checkedSchedule, setCheckedSchedule] = useState<number>(-1)

  const setPlacesByDate = useSetRecoilState(placesByDateState)

  // 임시 Object 수정
  const sampleObject: placeObject = {
    kakaoPlaceId: "sampleId",
    placeName: "Sample Place",
    latitude: "123.456",
    longitude: "789.123",
    address: "Sample Address",
    placeDetails: {
      memo: "Sample Memo",
      cost: 10000,
      visitTime: "08:00:00"
    }
  }

  // API 요구 사항에 맞게 데이터를 설정하는 함수
  const setPlaces = () => {
    if (checkedSchedule !== -1 && activeIndex !== -1) {
      // API 형식에 맞추어 데이터 구성
      const placesData: placeObject[] | undefined = loadedSchedules?.data?.[selectedIndex].schedules[
        checkedSchedule
      ].places.map(place => place) as unknown as placeObject[]

      // 올바르게 타입 정의에 맞는 데이터를 설정
      setPlacesByDate(prev => ({ ...prev, [activeIndex]: placesData }))
    }
  }

  const detailScheduleArray: placeObject[][] = [
    [sampleObject, sampleObject, sampleObject, sampleObject],
    [sampleObject, sampleObject, sampleObject, sampleObject],
    [sampleObject, sampleObject, sampleObject, sampleObject]
  ]

  function detailScheduleClickHandler(index: number) {
    setShowBookmarkSchedule(false)
    setSelectedIndex(index)
  }

  function returnButtonClickHandler() {
    setShowBookmarkSchedule(true)
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

  // 다른 일정에서 불러오기를 누르면 초기화
  useEffect(() => {
    setShowBookmarkSchedule(true)
    setSelectedIndex(-1)
    setCheckedSchedule(-1)
  }, [activeIndex])

  async function getBookmarkSchedule() {
    try {
      const bookmarkedSchedules: TravelPlan[] = []

      const data = await useCustomFetch(
        `${process.env.REACT_APP_API_URL}/api/my/bookmarks?page=0&size=10&sort=id,desc`,
        {}
      ).then(response => response)
      if (!data.ok) {
        throw new Error("Data Loading Error")
      }
      const jsonData = await data.json()
      for (const item of jsonData.data.content) {
        await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/plans/${item.planId}`, {})
          .then(response => response.json())
          .then(response => bookmarkedSchedules.push(response.data))
      }

      return bookmarkedSchedules
    } catch (error) {
      console.log(error)
    }
  }

  const loadedSchedules = useQuery({ queryKey: ["loadedSchedules"], queryFn: getBookmarkSchedule })

  console.log(loadedSchedules.data)
  return (
    <Card width="600px">
      {showBookmarkSchedule && (
        <>
          <CardHeader fontSize="18px" fontWeight="700">
            <Text>즐겨찾기한 일정</Text>
          </CardHeader>
          <CardBody display="flex" pl="10px" pr="10px" flexWrap="wrap">
            {loadedSchedules?.data &&
              loadedSchedules?.data.map((item, index) => (
                <Card
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  key={index}
                  width="280px"
                  height="120px"
                  padding="0 0 10px 10px"
                  margin="0 0 10px 10px"
                  cursor="pointer"
                  onClick={() => detailScheduleClickHandler(index)}
                >
                  <CardInfo
                    title={item.title}
                    ml_size="0px"
                    scheduleDetails={{
                      title: item.title,
                      startDate: item.startDate,
                      endDate: item.endDate,
                      tags: [],
                      region: item.region,
                      schedules: item.schedules,
                      totalBudget: 0,
                      likeCount: 0, // 예시로 0으로 초기화
                      bookMarkCount: 0, // 예시로 0으로 초기화
                      createdAt: item.createdAt // 예시로 빈 문자열로 초기화
                    }}
                  />

                  <Flex width="95%" justifyContent="flex-end" fontSize="11px" color="gray" mt="15px">
                    작성일자:{" "}
                    {new Date(item.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                      })
                      .replace(/\. /g, "-")
                      .replace(/\./, "")}
                  </Flex>
                </Card>
              ))}
          </CardBody>
        </>
      )}

      {!showBookmarkSchedule && (
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
                {loadedSchedules?.data && (
                  <CardInfo
                    title={loadedSchedules.data[selectedIndex].title}
                    ml_size="0px"
                    scheduleDetails={{
                      ...loadedSchedules.data[selectedIndex],
                      tags: [],
                      totalBudget: loadedSchedules.data[selectedIndex].totalCost ?? 0
                    }}
                  />
                )}
              </Box>
              <Avatar
                mt="25px"
                src="https://plus.unsplash.com/premium_photo-1661963130289-aa70dd516940?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </Box>
          </CardHeader>

          <CardBody display="flex" flexWrap="wrap">
            {loadedSchedules?.data?.[selectedIndex] &&
              loadedSchedules?.data?.[selectedIndex].schedules.map((schedule, index) => {
                return (
                  <Box display="flex" key={index}>
                    <DaySummary
                      selectedDay={`Day ${index + 1}`}
                      destinations={schedule.places.map(place => place.placeName)}
                      size="lg"
                    />
                    <Checkbox
                      isChecked={checkedSchedule === index}
                      onChange={() => checkClickEvent(index)}
                      ml="-36px"
                      mt="6px"
                    ></Checkbox>
                  </Box>
                )
              })}
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
