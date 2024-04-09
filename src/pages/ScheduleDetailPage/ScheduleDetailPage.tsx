import React, { useEffect, useState } from "react"
import HorizontalCard from "@/components/HorizontalCard/HorizontalCard"
import DayTab from "@/components/DayTab/DayTab"
import { Card, CardHeader, CardBody } from "@chakra-ui/card"
import { Box, Text } from "@chakra-ui/react"
import { IndexStyle, ScheduleDetailStyle } from "./ScheduleDetailPage.style"
import RouteMap from "@/pages/CreateSchedulePage/RouteMap"
import axios from "axios"
import { useParams } from "react-router-dom"

export interface PlaceDetail {
  memo: string
  cost: number
  visitTime: string
}

export interface Place {
  placeName: string
  placeDetails: PlaceDetail[]
}

export interface ScheduleDay {
  day: number
  places: Place[]
}

export interface ScheduleDetails {
  tags: string
  title: string
  startDate: string
  endDate: string
  region: string
  schedules: ScheduleDay[]
  totalBudget: number
  likeCount: number
  bookMarkCount: number
  createdAt: string
}

const ScheduleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleDetails | null>(null)
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0) // 선택된 탭의 인덱스

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const response = await axios.get(`/api/schedules/${id}`)
        setScheduleDetails(response.data)
      } catch (error) {
        console.error("Error fetching schedule details:", error)
      }
    }

    fetchScheduleDetails()
  }, [id])

  if (!scheduleDetails) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Box ml="100px" mb="30px">
        <HorizontalCard size="lg" scheduleDetails={scheduleDetails} />
        <DayTab
          destinations={scheduleDetails.schedules.map(schedule => schedule.places.map(place => place.placeName))}
          // 선택된 탭의 인덱스를 설정하는 함수
          onTabClick={index => setSelectedTabIndex(index)}
        />

        <Box display="flex" mt="-2" ml="600px">
          <Box mt="-10">
            <RouteMap />
          </Box>
        </Box>
        <ScheduleDetailStyle>
          {/* 선택된 탭에 해당하는 날짜의 스케줄만 렌더링합니다. */}
          {scheduleDetails.schedules[selectedTabIndex].places.map((place, placeIndex) => (
            <Box width="500px" mt="10px" key={placeIndex} ml="-10px">
              <Card fontSize="15px" fontWeight="bold" ml="-10px">
                <CardHeader>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex">
                      <IndexStyle>{placeIndex + 1}</IndexStyle>
                      <Text>{place.placeName}</Text>
                    </Box>
                    <Text color="gray.500" fontSize="15px" ml="5px">
                      {place.placeDetails.length > 0 && `도착 시간: ${place.placeDetails[0].visitTime}`}
                    </Text>
                  </Box>
                </CardHeader>
                <CardBody display="flex" justifyContent="space-between">
                  <Text color="gray.500" fontSize="15px" ml="5px">
                    {place.placeDetails.length > 0 && `메모 : ${place.placeDetails[0].memo}`}
                  </Text>
                  <Text color="gray.500" fontSize="12px" ml="5px">
                    {place.placeDetails.length > 0 && `예상 경비: ${place.placeDetails[0].cost}원`}
                  </Text>
                </CardBody>
              </Card>
            </Box>
          ))}
        </ScheduleDetailStyle>
      </Box>
    </>
  )
}

export default ScheduleDetailPage
