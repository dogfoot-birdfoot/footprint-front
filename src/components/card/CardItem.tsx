import React from "react"
import { Avatar, Badge, Box, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { ImageContainer, PositionedAvatar } from "@/components/Card/CardItem.style"
import { useLocation } from "react-router-dom"

const CardItem = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <>
      <Card maxW="xs" marginLeft="10px">
        <CardBody>
          <Box display="flex" justifyContent="center">
            <ImageContainer>
              <Image
                src="https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="강원도 산 사진"
                borderRadius="lg"
                width={"330px"}
                height={"160px"}
              />
              <PositionedAvatar>
                <Avatar border="2px solid white" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              </PositionedAvatar>
            </ImageContainer>
          </Box>
          <Stack mt="3" spacing="3">
            <Box display="flex" justifyContent="space-between" mt="-79">
              <Box>
                <Badge variant="subtle" colorScheme="green" minWidth="50px">
                  2박 3일
                </Badge>
              </Box>
              {/* pathname에 따라서 즐겨찾기와 좋아요 동적으로 노출 */}
              <Box display="flex" gap="2">
                {path.includes("schedule_share") && (
                  <Badge variant="subtle" colorScheme="red" minWidth="50px">
                    즐겨찾기 15
                  </Badge>
                )}
                {(path.includes("schedule_share") || path.includes("review_share")) && (
                  <Badge variant="subtle" colorScheme="yellow" minWidth="40px">
                    좋아요 30
                  </Badge>
                )}
              </Box>
            </Box>
            <Text color="gray.500" fontSize="9px" mt="-2" mb="-2">
              2024.03.05 ~ 2024.03.07
            </Text>
            <Heading size="sm">가족과 함께 가기 좋은 강원도 여행 일정</Heading>
            <Box textAlign="right">
              <Text color="gray.500" fontSize="9px" mb="-2">
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
