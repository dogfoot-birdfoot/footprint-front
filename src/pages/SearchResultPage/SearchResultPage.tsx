import { Avatar, Badge, Box, Card, CardBody, Heading, Image, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import React from "react"
import { useLocation } from "react-router-dom"
import { ImageContainer, PositionedAvatar } from "@/components/Card/CardItem.style"

const mockData = [
  {
    id: 1,
    imgsrc:
      "https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "가족과 함께 가기 좋은 제주도 여행일정",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "false"
  },
  {
    id: 2,
    imgsrc:
      "https://images.unsplash.com/photo-1654583065857-be16e3a06ddb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "연인과 함께 걷기 좋은 제주도 여행",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "false"
  },
  {
    id: 3,
    imgsrc:
      "https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "친구들이랑 다같이 제주도 여행",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "false"
  },
  {
    id: 4,
    imgsrc:
      "https://images.unsplash.com/photo-1543503430-244aace16cbd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "나홀로 떠나기 좋은 제주도",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "false"
  },
  {
    id: 5,
    imgsrc:
      "https://images.unsplash.com/photo-1649427451474-32ae805d03ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "제주도 여행리뷰",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "true"
  },
  {
    id: 6,
    imgsrc:
      "https://images.unsplash.com/photo-1642950723048-31ab8801dd70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "제주도 여행 다녀온 후기",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "true"
  },
  {
    id: 7,
    imgsrc:
      "https://images.unsplash.com/photo-1647413452570-e7c486d97732?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "제주도 여행리뷰남기기",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    author: "User nickname",
    creation: "2024-03-02",
    days: "2박3일",
    period: "2024.03.02 ~ 2024.03.05",
    favorite: "20",
    isReview: "true"
  }
]

const SearchResultsPage: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")?.toLowerCase()

  const filteredScheduleData = mockData.filter(
    item =>
      (item.title.toLowerCase().includes(query || "") || item.description.toLowerCase().includes(query || "")) &&
      item.isReview === "false" // isReview가 "false"인 항목만 포함
  )

  const filteredReviewData = mockData.filter(
    item =>
      (item.title.toLowerCase().includes(query || "") || item.description.toLowerCase().includes(query || "")) &&
      item.isReview === "true"
  )

  return (
    <Box mb="30px">
      <Heading size="sm" mt="30px" mb="30px" ml="40px">
        {`"${query}"에 대한 여행일정 검색결과입니다.`}
      </Heading>
      <Wrap spacing="20px" ml="40px">
        {filteredScheduleData.length > 0 ? (
          filteredScheduleData.map(item => (
            <WrapItem key={item.id}>
              <Card maxW="xs">
                <CardBody>
                  <Box display="flex" justifyContent="center">
                    <ImageContainer>
                      <Image src={item.imgsrc} alt={item.title} borderRadius="lg" width={"330px"} height={"160px"} />
                      <PositionedAvatar>
                        <Avatar
                          border="2px solid white"
                          size="md"
                          name={item.author}
                          src="https://bit.ly/kent-c-dodds"
                        />
                      </PositionedAvatar>
                    </ImageContainer>
                  </Box>
                  <Stack mt="3" spacing="3">
                    <Box display="flex" justifyContent="space-between" mt="-79">
                      <Badge borderRadius="10px" colorScheme="green" minWidth="50px">
                        {item.days}
                      </Badge>
                      <Box display="flex" gap="2">
                        <Badge borderRadius="10px" colorScheme="red">
                          즐겨찾기 {item.favorite}
                        </Badge>
                        <Badge borderRadius="10px" colorScheme="yellow">
                          좋아요 30
                        </Badge>
                      </Box>
                    </Box>
                    <Text color="gray.500" fontSize="9px" mt="-1" mb="-2">
                      {item.period}
                    </Text>
                    <Heading size="sm">{item.title}</Heading>
                    <Box textAlign="right">
                      <Text color="gray.500" fontSize="9px" mb="-2">
                        작성일자: {item.creation}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </WrapItem>
          ))
        ) : (
          <Heading size="sm">No results found for {query}.</Heading>
        )}
      </Wrap>
      {/* 리뷰 검색결과 노출 */}
      <Box>
        <Heading size="sm" mt="30px" mb="30px" ml="40px">
          {`"${query}"에 대한 리뷰 검색결과입니다.`}
        </Heading>

        <Wrap spacing="20px" ml="40px">
          {filteredReviewData.length > 0 ? (
            filteredReviewData.map(item => (
              <WrapItem key={item.id}>
                <Card maxW="xs">
                  <CardBody>
                    <Box display="flex" justifyContent="center">
                      <ImageContainer>
                        <Image src={item.imgsrc} alt={item.title} borderRadius="lg" width={"330px"} height={"160px"} />
                        <PositionedAvatar>
                          <Avatar
                            border="2px solid white"
                            size="md"
                            name={item.author}
                            src="https://bit.ly/kent-c-dodds"
                          />
                        </PositionedAvatar>
                      </ImageContainer>
                    </Box>
                    <Stack mt="3" spacing="3">
                      <Box display="flex" justifyContent="space-between" mt="-79">
                        <Badge borderRadius="10px" colorScheme="green" minWidth="50px">
                          {item.days}
                        </Badge>
                        <Box display="flex" gap="2">
                          <Badge borderRadius="10px" colorScheme="yellow">
                            좋아요 30
                          </Badge>
                        </Box>
                      </Box>
                      <Text color="gray.500" fontSize="9px" mt="-1" mb="-2">
                        {item.period}
                      </Text>
                      <Heading size="sm">{item.title}</Heading>
                      <Box textAlign="right">
                        <Text color="gray.500" fontSize="9px" mb="-2">
                          작성일자: {item.creation}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </WrapItem>
            ))
          ) : (
            <Heading size="sm">No results found for {query}.</Heading>
          )}
        </Wrap>
      </Box>
    </Box>
  )
}

export default SearchResultsPage
