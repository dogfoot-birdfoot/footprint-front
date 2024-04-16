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

  // 임시 Object 수정
  const sampleObject: placeObject = {
    kakaoPlaceId: "sampleId",
    placeName: "Sample Place",
    latitude: 123.456,
    longitude: 789.123,
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
      const placesData = cardList[selectedIndex]["detailSchedule"][checkedSchedule].map(place => ({
        kakaoPlaceId: place.kakaoPlaceId,
        placeName: place.placeName,
        latitude: place.latitude,
        longitude: place.longitude,
        address: place.address,
        placeDetails: {
          memo: place.placeDetails.memo,
          cost: place.placeDetails.cost,
          visitTime: place.placeDetails.visitTime
        }
      }))

      // 올바르게 타입 정의에 맞는 데이터를 설정
      setPlacesByDate(prev => ({ ...prev, [activeIndex]: placesData }))
    }
  }

  const detailScheduleArray: placeObject[][] = [
    [sampleObject, sampleObject, sampleObject, sampleObject],
    [sampleObject, sampleObject, sampleObject, sampleObject],
    [sampleObject, sampleObject, sampleObject, sampleObject]
  ]

  // 'cardList' 업데이트
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
      region: "부산",
      schedules: [], // 일정 정보 추가
      totalBudget: 500000, // 총 예산 추가
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
      region: "부산",
      schedules: [], // 일정 정보 추가
      totalBudget: 500000, // 총 예산 추가
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
      region: "부산",
      schedules: [], // 일정 정보 추가
      totalBudget: 500000, // 총 예산 추가
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
      region: "부산",
      schedules: [], // 일정 정보 추가
      totalBudget: 500000, // 총 예산 추가
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
                <CardInfo
                  title={item["title"]}
                  ml_size="0px"
                  scheduleDetails={{
                    title: item["title"],
                    startDate: "2023-04-01",
                    endDate: "2023-04-05",
                    tags: item["tags"],
                    region: item["region"],
                    schedules: [
                      {
                        day: 1,
                        places: [
                          {
                            kakaoPlaceId: "sampleId1",
                            placeName: "Sample Place 1",
                            latitude: 37.12345,
                            longitude: 127.54321,
                            address: "Sample Address 1",
                            placeDetails: {
                              memo: "Sample Memo 1",
                              cost: 10000,
                              visitTime: "08:00:00"
                            }
                          },
                          {
                            kakaoPlaceId: "sampleId2",
                            placeName: "Sample Place 2",
                            latitude: 37.54321,
                            longitude: 127.12345,
                            address: "Sample Address 2",
                            placeDetails: {
                              memo: "Sample Memo 2",
                              cost: 15000,
                              visitTime: "10:00:00"
                            }
                          }
                          // 필요한 만큼 장소 데이터를 추가할 수 있습니다.
                        ]
                      },
                      {
                        day: 2,
                        places: [
                          {
                            kakaoPlaceId: "sampleId3",
                            placeName: "Sample Place 3",
                            latitude: 37.98765,
                            longitude: 127.6789,
                            address: "Sample Address 3",
                            placeDetails: {
                              memo: "Sample Memo 3",
                              cost: 20000,
                              visitTime: "13:00:00"
                            }
                          }
                          // 필요한 만큼 장소 데이터를 추가할 수 있습니다.
                        ]
                      }
                      // 필요한 만큼 일정을 추가하고 장소 데이터를 넣어주세요.
                    ],
                    totalBudget: item["totalBudget"],
                    likeCount: 0, // 예시로 0으로 초기화
                    bookMarkCount: 0, // 예시로 0으로 초기화
                    createdAt: "2024.04.05" // 예시로 빈 문자열로 초기화
                  }}
                />

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
                <CardInfo
                  title={cardList[selectedIndex]["title"]}
                  ml_size="0px"
                  scheduleDetails={{
                    title: cardList[selectedIndex]["title"],
                    startDate: "2023-04-10",
                    endDate: "2023-04-11",
                    tags: ["커플여행", "관광", "휴식", "바다여행"],
                    region: "부산",
                    schedules: [
                      {
                        day: 1,
                        places: [
                          {
                            kakaoPlaceId: "sampleId1",
                            placeName: "Sample Place 1",
                            latitude: 35.17944,
                            longitude: 129.07556,
                            address: "Sample Address 1",
                            placeDetails: {
                              memo: "Sample Memo 1",
                              cost: 10000,
                              visitTime: "08:00:00"
                            }
                          },
                          {
                            kakaoPlaceId: "sampleId2",
                            placeName: "Sample Place 2",
                            latitude: 35.17944,
                            longitude: 129.07556,
                            address: "Sample Address 2",
                            placeDetails: {
                              memo: "Sample Memo 2",
                              cost: 15000,
                              visitTime: "10:00:00"
                            }
                          }
                        ]
                      },
                      {
                        day: 2,
                        places: [
                          {
                            kakaoPlaceId: "sampleId3",
                            placeName: "Sample Place 3",
                            latitude: 35.17944,
                            longitude: 129.07556,
                            address: "Sample Address 3",
                            placeDetails: {
                              memo: "Sample Memo 3",
                              cost: 20000,
                              visitTime: "13:00:00"
                            }
                          }
                        ]
                      }
                    ],
                    totalBudget: 500000,
                    likeCount: 0,
                    bookMarkCount: 0,
                    createdAt: "20204.04.10"
                  }}
                />
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
