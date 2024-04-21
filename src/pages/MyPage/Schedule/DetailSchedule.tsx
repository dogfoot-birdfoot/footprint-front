import React from "react"
import {
  Box,
  Button,
  Text,
  Badge,
  VStack,
  Stack,
  Heading,
  Collapse,
  useDisclosure,
  Divider,
  Avatar,
  Flex
} from "@chakra-ui/react"
import { FaRegThumbsUp } from "react-icons/fa"
import { CiStar } from "react-icons/ci"

interface DetailScheduleProps {
  id: number
  title: string
  startDate: string
  endDate: string
  region: string
  visible: boolean
  copyAllowed: boolean
  schedules: Schedule[]
  likeCount: number
  bookmarkCount: number
}

interface Schedule {
  day: number
  places: Place[]
}

interface Place {
  kakaoPlaceId: string
  placeName: string
  latitude: number
  longitude: number
  address: string
  placeDetails: PlaceDetails
}

interface PlaceDetails {
  memo: string
  cost: number
  visitTime: VisitTime
}

interface VisitTime {
  hour: number
  minute: number
  second: number
  nano: number
}

const DetailSchedule: React.FC<DetailScheduleProps> = ({
  id,
  title,
  startDate,
  endDate,
  region,
  visible,
  copyAllowed,
  schedules,
  likeCount,
  bookmarkCount
}) => {
  const { isOpen, onToggle } = useDisclosure()

  const formatDate = (date: string | number | Date) => {
    return new Date(date)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
      .replace(/\. /g, "-")
      .replace(/\./, "")
  }

  const calculateTripDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const durationInDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return durationInDays === 0 ? "1일 여행" : `${durationInDays}박 ${durationInDays + 1}일`
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="4" p="4" shadow="md" bg="white">
      <VStack spacing={4} align="stretch">
        <Box>
          <Badge colorScheme="yellow">{calculateTripDuration(startDate, endDate)}</Badge>
          <Heading mt={2} size="md" isTruncated>
            {title} - {region}
          </Heading>
          <Text fontSize="sm" mt={2}>
            기간: {startDate} ~ {endDate}
          </Text>
          <Box display="flex" mt={2}>
            <Text fontSize="sm">공개 여부: </Text>
            <Badge colorScheme={visible ? "green" : "red"}>{visible ? "Yes" : "No"}</Badge>
            <Text fontSize="sm">, 복사 허용: </Text>
            <Badge colorScheme={copyAllowed ? "green" : "red"}>{copyAllowed ? "Yes" : "No"}</Badge>
          </Box>
          <Flex alignItems="center" mt={2}>
            <Text fontSize="sm" mr={2}>
              좋아요
            </Text>
            <FaRegThumbsUp />
            <Text fontSize="sm" mx={2}>
              : {likeCount}, 즐겨찾기
            </Text>
            <CiStar />
            <Text fontSize="sm" ml={2}>
              : {bookmarkCount}
            </Text>
          </Flex>
          <Flex justifyContent="flex-end">
            <Button size="sm" backgroundColor="#10bbd5" color="white" onClick={onToggle}>
              {isOpen ? "세부 일정 숨기기" : "세부 일정 보기"}
            </Button>
          </Flex>
        </Box>

        <Collapse in={isOpen} animateOpacity>
          <Stack spacing={4}>
            {schedules.map((schedule, index) => (
              <Box key={index} pl={5} pr={5} pt={2} pb={2} bg="gray.50" borderRadius="md">
                <Heading size="md">Day {schedule.day}</Heading>
                <Divider my={2} />
                {schedule.places.map((place, idx) => (
                  <Box key={idx} p={2}>
                    <Text fontWeight="bold">{place.placeName}</Text>
                    <Text fontSize="sm">주소: {place.address}</Text>
                    <Text fontSize="sm">메모: {place.placeDetails.memo}</Text>
                    <Text fontSize="sm">비용: {place.placeDetails.cost}원</Text>
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </Collapse>
      </VStack>
    </Box>
  )
}

export default DetailSchedule
