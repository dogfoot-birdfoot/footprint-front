import React, { useEffect, useState } from "react"
import HorizontalCard from "@/components/HorizontalCard/HorizontalCard"
import DayTab from "@/components/DayTab/DayTab"
import { Card, CardBody, CardHeader } from "@chakra-ui/card"
import { Box, Text, VStack, HStack, Tag, Flex, Heading, Badge, Divider } from "@chakra-ui/react"
import { Editable, EditablePreview, EditableTextarea } from "@chakra-ui/editable"
import { IndexStyle, ScheduleDetailStyle } from "./ScheduleDetailPage.style"
import RouteMap from "@/pages/CreateSchedulePage/RouteMap"
import axios from "axios"
import { useParams } from "react-router-dom"
import { MdPlace } from "react-icons/md"

interface PlaceDetail {
  memo: string
  cost: number
}

interface Place {
  placeName: string
  placeDetails: PlaceDetail[]
}

interface ScheduleDay {
  day: number
  places: Place[]
}

interface ScheduleDetails {
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
    <VStack spacing={4} align="stretch">
      <Heading>{scheduleDetails.title}</Heading>
      <Text>{`기간: ${scheduleDetails.startDate} - ${scheduleDetails.endDate}`}</Text>
      <Badge colorScheme="purple">{scheduleDetails.region}</Badge>
      <Divider />
      {scheduleDetails.schedules.map((schedule, index) => (
        <Box key={index} p={5} borderWidth="1px" borderRadius="lg">
          <Heading size="md">Day {schedule.day}</Heading>
          {schedule.places.map((place, placeIndex) => (
            <Box key={placeIndex} mt={4}>
              <Text fontWeight="bold">{place.placeName}</Text>
              {place.placeDetails.map((detail, detailIndex) => (
                <Box key={detailIndex} ml={4}>
                  <Text>{`Memo: ${detail.memo}`}</Text>
                  <Text>{`Cost: ${detail.cost}`}</Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ))}
      <Box>
        <Text fontWeight="bold">총 예산: {scheduleDetails.totalBudget}원</Text>
        <Text>좋아요: {scheduleDetails.likeCount}</Text>
        <Text>북마크: {scheduleDetails.bookMarkCount}</Text>
      </Box>
    </VStack>
  )
}

export default ScheduleDetailPage
