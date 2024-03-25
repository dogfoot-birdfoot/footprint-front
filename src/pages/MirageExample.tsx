import React, { useEffect, useState } from "react"
import { Avatar, Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { makeServer } from "mirage"

if (process.env.NODE_ENV === "development") {
  // makeServer({ environment: "development" })
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

  useEffect(() => {
    // Mirage JS를 통해 가상의 API 호출
    fetch("/api/users")
      .then(response => response.json())
      .then(json => setUsers(json.users))
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
    </Box>
  )
}

export default MirageExample
