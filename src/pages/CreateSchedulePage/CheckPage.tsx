import React, { useState, useEffect } from "react"
import axios from "axios"
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react"

const CheckPage: React.FC = () => {
  // 상태 설정
  const [postedSchedules, setPostedSchedules] = useState<any[]>([])

  // 게시된 일정 정보 가져오기
  useEffect(() => {
    const getPostedSchedules = async () => {
      try {
        const response = await axios.get("/api/schedules/get")
        setPostedSchedules(response.data)
      } catch (error) {
        console.error("Failed to fetch posted schedules", error)
      }
    }

    // 페이지 렌더링 후에 게시된 일정 정보를 가져옵니다.
    getPostedSchedules()
  }, [])

  return (
    <div>
      <Heading as="h1" size="lg" mb="4">
        게시된 일정 정보
      </Heading>
      {postedSchedules.length > 0 ? (
        postedSchedules.map((schedule, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p="4" my="4">
            <Heading as="h2" size="md" mb="2">
              일정 {index + 1}
            </Heading>
            <Text>제목: {schedule.title}</Text>
            <Text>시작일: {schedule.startDate}</Text>
            <Text>종료일: {schedule.endDate}</Text>
            <Text>지역: {schedule.region}</Text>
            <Text>공개 여부: {schedule.visible ? "공개" : "비공개"}</Text>
            <Text>복사 허용: {schedule.copyAllowed ? "허용" : "불허용"}</Text>
            <Text>태그: {schedule.tags.join(", ")}</Text>
            {/* 메모와 예산 정보 표시 */}
            <VStack align="start" mt="4">
              {schedule.schedules.map((day: any, dayIndex: number) => (
                <Box key={dayIndex}>
                  <Heading as="h3" size="sm" mb="2">
                    Day {dayIndex + 1}
                  </Heading>
                  {day.places.map((place: any, placeIndex: number) => (
                    <Box key={placeIndex} ml="4">
                      <Text>
                        장소 {placeIndex + 1}: {place.placeName}
                      </Text>
                      {place.placeDetails.map((detail: any, detailIndex: number) => (
                        <HStack key={detailIndex}>
                          <Text fontSize="sm">메모: {detail.memo}</Text>
                          <Text fontSize="sm">예산: {detail.cost}원</Text>
                        </HStack>
                      ))}
                    </Box>
                  ))}
                </Box>
              ))}
            </VStack>
          </Box>
        ))
      ) : (
        <Text>게시된 일정이 없습니다.</Text>
      )}
    </div>
  )
}

export default CheckPage
