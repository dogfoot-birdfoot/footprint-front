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
    favorite: "20"
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
    favorite: "20"
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
    favorite: "20"
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
    favorite: "20"
  }
]

const SearchResultsPage: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")?.toLowerCase()

  const filteredData = mockData.filter(
    item => item.title.toLowerCase().includes(query || "") || item.description.toLowerCase().includes(query || "")
  )

  return (
    <>
      <Heading size="sm" mt="10px" mb="30px" ml="10px">
        {query} 에 대한 여행일정 검색결과입니다.
      </Heading>
      <Box display="flex" mb="20px">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <Card maxW="xs" marginLeft="10px" key={item.id}>
              <CardBody>
                <Box display="flex" justifyContent="center">
                  <ImageContainer>
                    <Image src={item.imgsrc} alt={item.title} borderRadius="lg" width={"330px"} height={"160px"} />
                    <PositionedAvatar>
                      <Avatar border="2px solid white" size="md" name={item.author} src="https://bit.ly/kent-c-dodds" />
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
          ))
        ) : (
          <Text>No results found for `{query}`.</Text>
        )}
      </Box>
    </>
  )
}

export default SearchResultsPage
