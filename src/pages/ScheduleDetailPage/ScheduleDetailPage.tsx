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
//   // return (
//   //   <Box ml="100px" mb="30px">
//   //     <HorizontalCard />
//   //     <DayTab destinations={destinations} />
//   //     <Box display="flex" mt="-2" ml="600px">
//   //       <Box mt="-10">
//   //         <RouteMap />
//   //       </Box>
//   //     </Box>
//   //     <ScheduleDetailStyle>
//   //       {destinations.map((destination, index) => (
//   //         <Box width="500px" mt="10px" key={index} ml="-10px">
//   //           <Card fontSize="15px" fontWeight="bold" ml="-10px">
//   //             <CardHeader display="flex" justifyContent="space-between">
//   //               <Box display="flex">
//   //                 <IndexStyle>{index + 1}</IndexStyle>
//   //                 <Text>{destination}</Text>
//   //                 <Text color="gray.500" fontSize="15px" ml="5px">
//   //                   13:00
//   //                 </Text>
//   //               </Box>
//   //               <Text color="gray.500" fontSize="12px" ml="5px">
//   //                 예상경비 : 30,000원
//   //               </Text>
//   //             </CardHeader>
//   //             <CardBody>
//   //               <Editable defaultValue="바다 풍경보고 사진 많이 찍기, 시장 맛집투어" mt="-4">
//   //                 <EditablePreview />
//   //                 <EditableTextarea />
//   //               </Editable>
//   //             </CardBody>
//   //           </Card>
//   //         </Box>
//   //       ))}
//   //     </ScheduleDetailStyle>
//   //   </Box>
//   // )

//   return (
//     <Box>
//       <VStack spacing={4}>
//         {/* 날짜별 탭 렌더링 */}
//         {scheduleDetails.schedules.map((schedule, index) => (
//           <Tag
//             key={index}
//             size="lg"
//             colorScheme={selectedDay === schedule.day ? "blue" : "gray"}
//             onClick={() => handleDayChange(schedule.day)}
//             cursor="pointer"
//           >
//             Day {schedule.day}
//           </Tag>
//         ))}
//       </VStack>

//       <Flex direction="column" mt="4">
//         {/* 선택된 날짜의 여행지 정보 렌더링 */}
//         {scheduleDetails.schedules
//           .find(schedule => schedule.day === selectedDay)
//           ?.places.map((place, index) => (
//             <HStack key={index} spacing={4} align="center">
//               <MdPlace />
//               <Text>{place.placeName}</Text>
//               {place.placeDetails.map((detail, idx) => (
//                 <Text key={idx} fontSize="sm">
//                   {detail.memo} (비용: {detail.cost}원)
//                 </Text>
//               ))}
//             </HStack>
//           ))}
//       </Flex>
//     </Box>
//   )
// }

// export default ScheduleDetailPage
export default ScheduleDetailPage
