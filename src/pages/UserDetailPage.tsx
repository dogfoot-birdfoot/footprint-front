import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Box, VStack, Heading, Text, Divider } from "@chakra-ui/react"

interface User {
  id: number
  email: string
  nickname: string
  profilePicture: string
}

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`)
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user details:", error)
      }
    }

    fetchUser()
  }, [userId])

  if (!user) {
    return <Text>Loading...</Text>
  }

  return (
    <VStack spacing={4} align="stretch">
      <Heading>{user.nickname}</Heading>
      <Box p={5} borderWidth="1px" borderRadius="lg">
        <Text>Email: {user.email}</Text>
        <Divider />
        <Text>Profile Picture: {user.profilePicture}</Text>
      </Box>
    </VStack>
  )
}

export default UserDetailPage
