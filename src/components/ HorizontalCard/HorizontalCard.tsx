import React from "react"
import { Card, CardBody, CardFooter } from "@chakra-ui/card"
import { Image } from "@chakra-ui/image"
import { Badge, Box, Heading, Stack, Text } from "@chakra-ui/layout"
import KakaoButton from "../KakaoButton/KakaoButton"
import { TagBox, TagStyle } from "./HorizontalCard.style"
import { Avatar } from "@chakra-ui/avatar"

// 카카오톡으로 일정을 공유하는 함수
const shareScheduleWithKakao = () => {
  // 여기에 카카오톡 공유 로직을 구현합니다.
  console.log("카카오톡으로 일정 공유하기")
}

const HorizontalCard = () => {
  return (
    <>
      <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline">
        <Image
          src="https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="강원도 산 사진"
          width="300px"
          height="250px"
          ml="5"
          mt="5"
          borderRadius="10px"
        />

        <Stack>
          <CardBody>
            <Box mt="-2" display="flex" justifyContent="space-between">
              <Badge variant="subtle" colorScheme="green" minWidth="50px" mt="5">
                2박 3일
              </Badge>
              <Text color="gray.500" fontSize="9px" ml="5px" mt="6">
                2024.03.05 ~ 2024.03.07
              </Text>
            </Box>
            <Heading size="md" mt="2">
              OO이랑 떠나는 강원도 여행
            </Heading>
            <Text color="gray.500" fontSize="11px" ml="5px" mt="1">
              총 예상 경비 : 550,000원
            </Text>
            <Box mt="5">
              <KakaoButton onClick={shareScheduleWithKakao}>카카오톡으로 일정 공유하기</KakaoButton>
            </Box>
            <TagBox>
              <TagStyle>커플여행</TagStyle>
              <TagStyle>관광</TagStyle>
              <TagStyle>휴식</TagStyle>
              <TagStyle>바다여행</TagStyle>
            </TagBox>
          </CardBody>

          <CardFooter display="flex" justifyContent="flex-end">
            <Box mt="-6">
              <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
                UserNickName
              </Text>
              <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
                2024.03.01 20:45작성
              </Text>
            </Box>
            <Avatar border="2px solid white" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" mt="-9" />
          </CardFooter>
        </Stack>
      </Card>
    </>
  )
}

export default HorizontalCard
