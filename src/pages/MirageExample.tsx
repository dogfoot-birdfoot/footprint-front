import React, { useEffect, useState } from "react"
import { Avatar, Badge, Box, Flex, HStack, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
// 여행 계획에 대한 인터페이스를 정의합니다.
export interface PlaceProps {
  kakaoPlaceId?: string
  placeName: string
  latitude?: number
  longitude?: number
  address?: string
  memo: string
  cost: number
  visitTime?: string
}

export interface ScheduleProps {
  id: string
  title?: string // 선택적 프로퍼티
  scheduleName?: string // 선택적 프로퍼티
  region: string
  dates?: string[] // 선택적 프로퍼티
  date?: string // 선택적 프로퍼티
  places: PlaceProps[]
  share?: boolean // 선택적 프로퍼티
  isShared?: boolean // 선택적 프로퍼티
  totalBudget: number
}

// 'nickname'과 'email' 필드를 User 인터페이스에 추가
interface User {
  id: string
  name: string
  nickname: string
  email: string
}

function MirageExample() {
  const [users, setUsers] = useState<User[]>([])
  const [data, setData] = useState<ScheduleProps[] | null>(null)

  useEffect(() => {
    // Mirage JS를 통해 가상의 API 호출
    fetch("/api/users")
      .then(response => response.json())
      .then(json => setUsers(json.users))
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/schedules")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box p={5} minH="100vh">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Users
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {users.map(user => (
          <Box key={user.id} p={5} shadow="xl" borderWidth="1px" borderRadius="lg">
            <Flex alignItems="center" mb={4}>
              <Avatar size="md" name={user.nickname} mr={4} />
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {user.nickname}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user.email}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      <VStack spacing={4} p={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Overview Page
        </Text>

        <div>
          <h1>Overview Page</h1>
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre> // Display fetched data
          ) : (
            <p>Loading...</p> // Show loading message while data is being fetched
          )}
        </div>
        {data ? (
          data.map(item => (
            <Box key={item.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="full">
              <VStack align="stretch">
                <HStack justifyContent="space-between">
                  <Text fontSize="xl" fontWeight="bold">
                    {item.title || item.scheduleName}
                  </Text>
                  <Badge colorScheme={item.share || item.isShared ? "green" : "red"}>
                    {item.share || item.isShared ? "Shared" : "Private"}
                  </Badge>
                </HStack>
                <Text>Region: {item.region}</Text>
                <Text>Dates: {item.dates ? item.dates.join(", ") : item.date}</Text>
                <Text>Total Budget: {item.totalBudget}</Text>
                <VStack align="start">
                  {item.places.map((place, index) => (
                    <Box key={index} p={2} shadow="sm" borderWidth="1px" borderRadius="md">
                      <Text fontWeight="bold">{place.placeName}</Text>
                      <Text fontSize="sm">Memo: {place.memo}</Text>
                      <Text fontSize="sm">Budget: {place.cost}</Text>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </Box>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </VStack>
    </Box>
  )
}

export default MirageExample
