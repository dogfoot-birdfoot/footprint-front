import React from "react"
import { Card } from "@chakra-ui/card"
import { Image } from "@chakra-ui/image"
import { Box, Text } from "@chakra-ui/layout"
import KakaoButton from "../KakaoButton/KakaoButton"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import { Avatar } from "@chakra-ui/avatar"
import Buttons from "@/components/Buttons/Buttons"
import { Badge, IconButton } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { CardInfoProps, HorizontalCardContentProps } from "./type"
import { TiStarFullOutline } from "react-icons/ti"
import { FaRegThumbsUp } from "react-icons/fa"

// 카카오톡으로 일정을 공유하는 함수
const shareScheduleWithKakao = () => {
  // 여기에 카카오톡 공유 로직을 구현합니다.
  console.log("카카오톡으로 일정 공유하기")
}

export const HorizontalCardContent: React.FC<HorizontalCardContentProps> = ({ size }) => {
  const mlsize: string = size === "lg" ? "50px" : "10px"

  return (
    <>
      <Box display="flex" mt="20px" mb="20px" alignItems="center" ml="30px">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661963130289-aa70dd516940?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="광안대교사진"
          width={size === "sm" ? "230px" : "300px"}
          height={size === "sm" ? "200px" : "250px"}
          ml="10px"
          borderRadius="10px"
        />

        <Box>
          <CardInfo ml_size={mlsize} />
          <Box width="260px" ml={mlsize} mt="10px">
            <Text color="gray.500" fontSize="12px" ml="5px" mt="1">
              총 예상 경비 : 550,000원
            </Text>
            <Box mt="5" width="100%">
              <KakaoButton onClick={shareScheduleWithKakao}>카카오톡으로 일정 공유하기</KakaoButton>
            </Box>
            <TagBox>
              <TagStyle>커플여행</TagStyle>
              <TagStyle>관광</TagStyle>
              <TagStyle>휴식</TagStyle>
              <TagStyle>바다여행</TagStyle>
            </TagBox>

            <UserInfo />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const CardInfo: React.FC<CardInfoProps> = ({ ml_size }) => {
  return (
    <>
      <Box width="260px" ml={ml_size} mt="10px">
        <Box mt="-2" display="flex">
          <Badge variant="subtle" colorScheme="green" minWidth="50px" mt="5">
            2박 3일
          </Badge>
          <Text color="gray.500" fontSize="10px" ml="5px" mt="6">
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
      </Box>
    </>
  )
}

export const UserInfo = () => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mt="5">
        <Text textAlign="end" color="gray.500" fontSize="10px" mr="5px">
          UserNickName
        </Text>
        <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
          2024.03.01 20:45작성
        </Text>
      </Box>
      <Avatar border="2px solid white" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" mt="2" />
    </Box>
  )
}

export const ScheduleButtons = () => {
  return (
    <Box>
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
      <Box mt="190px" ml="45px">
        <IconButton
          mr="10px"
          aria-label="good"
          icon={<TiStarFullOutline />}
          bg="#ffe351"
          color="white"
          borderRadius="20px"
        />
        <IconButton aria-label="favorite" icon={<FaRegThumbsUp />} bg="primary" color="white" borderRadius="20px" />
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
