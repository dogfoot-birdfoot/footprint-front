import React from "react"
import { Card, CardBody, CardFooter } from "@chakra-ui/card"
import { Image } from "@chakra-ui/image"
import { Badge, Box, Heading, Stack, Text } from "@chakra-ui/layout"
import KakaoButton from "../KakaoButton/KakaoButton"
import { TagBox, TagStyle } from "./HorizontalCard.style"
import { Avatar } from "@chakra-ui/avatar"
import Buttons from "@/components/Buttons/Buttons"
import { HorizontalCardContentProps } from "@components/HorizontalCard/type"

// 카카오톡으로 일정을 공유하는 함수
const shareScheduleWithKakao = () => {
  // 여기에 카카오톡 공유 로직을 구현합니다.
  console.log("카카오톡으로 일정 공유하기")
}

export const HorizontalCardContent: React.FC<HorizontalCardContentProps> = ({ size }) => {
  return (
    <>
      <Box display="flex" mt="20px" mb="20px" alignItems="center">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661963130289-aa70dd516940?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="광안대교사진"
          width={size === "sm" ? "230px" : "300px"}
          height={size === "sm" ? "200px" : "250px"}
          ml="10px"
          borderRadius="10px"
        />

        <Box>
          <Box ml="20px" mt="20px">
            <Box mt="-2" display="flex">
              <Badge variant="subtle" colorScheme="green" minWidth="50px" mt="5">
                2박 3일
              </Badge>
              <Text color="gray.500" fontSize="9px" ml="5px" mt="6">
                2024.03.05 ~ 2024.03.07
              </Text>
            </Box>
            <Heading
              size="md"
              mt="2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "18ch" // 18글자를 넘어가면 잘라내고 "..." 표시
              }}
            >
              OO이랑 떠나는 부산 여행
            </Heading>
            <Text color="gray.500" fontSize="11px" ml="5px" mt="1">
              총 예상 경비 : 550,000원
            </Text>
            <Box mt="4">
              <KakaoButton onClick={shareScheduleWithKakao}>카카오톡으로 일정 공유하기</KakaoButton>
            </Box>
            <TagBox>
              <TagStyle>커플여행</TagStyle>
              <TagStyle>관광</TagStyle>
              <TagStyle>휴식</TagStyle>
              <TagStyle>바다여행</TagStyle>
            </TagBox>

            <Box display="flex" justifyContent="flex-end">
              <Box mt="5">
                <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
                  UserNickName
                </Text>
                <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
                  2024.03.01 20:45작성
                </Text>
              </Box>
              <Avatar border="2px solid white" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" mt="2" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const ScheduleButtons = () => {
  return (
    <Box mt="6" display="flex">
      <Box mr="2">
        <Buttons text="수정" size="xs" />
      </Box>
      <Box mr="2">
        <Buttons text="삭제" size="xs" />
      </Box>
      <Box mr="4">
        <Buttons text="리뷰작성" size="xs" />
      </Box>
    </Box>
  )
}

export const HorizontalCard = () => {
  return (
    <>
      <Card
        justifyContent="space-between"
        width="1040px"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <HorizontalCardContent size="lg" />
        {/* 게시자에게만 보이도록 로직 수정 */}
        <ScheduleButtons />
      </Card>
    </>
  )
}

export default HorizontalCard
