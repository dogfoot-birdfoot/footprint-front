import React from "react"
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Circle,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  VStack
} from "@chakra-ui/react"
import { PositionedAvatar } from "@/components/Card/CardItem.style"
import { useLocation } from "react-router-dom"
import { MdPlace } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs"

interface PlaceDetail {
  memo: string
  cost: number
}

interface Place {
  placeName: string
  placeDetails: PlaceDetail[]
}

interface CardItemProps {
  title: string
  dates: string
  favoriteCount: number
  likeCount: number
  author: string
  schedules: { day: number; places: Place[] }[]
}

interface TimelineItemProps {
  day: number
  places: Place[]
}
export const TimelineItem: React.FC<TimelineItemProps> = ({ day, places }) => {
  return (
    <Box w="full" backgroundColor="#f5f7fa" borderRadius="10px">
      <HStack spacing={3} justify="start" w="full">
        {/* justify="start"로 왼쪽 정렬 설정 */}
        <Tag size="sm" variant="solid" backgroundColor="primary" borderRadius="full" mr={2}>
          <Flex align="center">
            <Text mr={1}>Day</Text>
            <Text mr={2}>{day}</Text>
          </Flex>
        </Tag>
        <HStack spacing={1} w="full">
          {places.slice(0, 3).map((place, index) => (
            <React.Fragment key={index}>
              <MdPlace size="15px" color="#10bbd5" />
              <Text fontWeight="semibold" fontSize="sm" isTruncated maxWidth="100px">
                {place.placeName}
              </Text>
              {/* 마지막 여행지가 아니거나 여행지가 3개 이하일 경우 가로점 아이콘을 추가하지 않음 */}
              {index < places.length - 1 && <Icon as={BsThreeDots} color="gray.500" />}
            </React.Fragment>
          ))}
        </HStack>
      </HStack>
    </Box>
  )
}

const CardItem: React.FC<CardItemProps> = ({ title, dates, favoriteCount, likeCount, author, schedules }) => {
  const location = useLocation()
  const path = location.pathname

  return (
    <>
      <Card maxW="xs" marginLeft="10px">
        <CardBody>
          <Box display="flex" justifyContent="center">
            <Box display="flex" justifyContent="space-between" height="200px" width="300px">
              <VStack spacing={4}>
                {schedules.map((schedule, index) => (
                  <TimelineItem key={index} day={schedule.day} places={schedule.places} />
                ))}
              </VStack>
              <PositionedAvatar>
                <Avatar border="2px solid white" size="md" name={author} src="https://bit.ly/kent-c-dodds" />
              </PositionedAvatar>
            </Box>
          </Box>
          <Stack mt="3" spacing="3">
            <Box display="flex" justifyContent="space-between" mt="-79">
              <Box>
                <Badge borderRadius="10px" colorScheme="green" minWidth="50px">
                  2박 3일
                </Badge>
              </Box>
              {/* path name에 따라 동적으로 노출 */}
              <Box display="flex" gap="2">
                {/* 엔드포인트가 'schedule_share' 이거나 경로에 아무 것도 없을 때 '즐겨찾기' 배지 표시 */}
                {(path.includes("schedule_share") || path === "/") && (
                  <Badge borderRadius="10px" colorScheme="red" minWidth="50px">
                    즐겨찾기 {favoriteCount}
                  </Badge>
                )}

                {/* 엔드포인트가 'schedule_share', 'review_share', 또는 경로에 아무 것도 없을 때 '좋아요' 배지 표시 */}
                {(path.includes("schedule_share") || path.includes("review_share") || path === "/") && (
                  <Badge borderRadius="10px" colorScheme="yellow" minWidth="40px">
                    좋아요 {likeCount}
                  </Badge>
                )}
              </Box>
            </Box>

            <Text color="gray.500" fontSize="9px" mt="-2" mb="-2">
              {dates}
            </Text>
            <Heading size="sm" mt="1">
              {title}
            </Heading>
            <Box textAlign="left">
              <Text color="gray.500" fontSize="9px" mb="-2" mt="-1">
                작성일자 : 2024-03-01
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default CardItem
