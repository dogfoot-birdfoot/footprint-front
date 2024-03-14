import React from "react"
import DaySummary from "@/components/DaySummary/DaySummary"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import KakaoButton from "@/components/KakaoButton/KakaoButton"
import { Box, Divider, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import { DaySchedule } from "../MySchedulePage/DetailSchedule.style"
import Buttons from "@/components/Buttons/Buttons"
import { CardInfo, UserInfo } from "@/components/HorizontalCard/HorizontalCard"
import { FaRegThumbsUp } from "react-icons/fa"
import { ImageSlider } from "./ImageSlider"

const shareScheduleWithKakao = () => {
  // 여기에 카카오톡 공유 로직을 구현합니다.
  console.log("카카오톡으로 일정 공유하기")
}
const destinations = [
  ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
  ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
  ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"]
]
const ReviewDetailPage = () => {
  return (
    <Box ml="80px" mb="40px">
      <Box display="flex">
        <Box display="flex" width="1000px" justifyContent="space-between" ml="-20px">
          <CardInfo />
          <Box ml="20px" mt="30px">
            <Box display="flex">
              <Box mr="2" ml="2">
                <Buttons text="수정" size="sm" />
              </Box>
              <Box mr="2">
                <Buttons text="삭제" size="sm" />
              </Box>
              <Box mr="2">
                <IconButton
                  aria-label="favorite"
                  icon={<FaRegThumbsUp />}
                  bg="primary"
                  color="white"
                  borderRadius="20px"
                />
              </Box>
              <KakaoButton onClick={shareScheduleWithKakao}>{""}</KakaoButton>
            </Box>
            <UserInfo />
          </Box>
        </Box>
      </Box>
      <Box ml="20px" mb="20px" mt="-60px">
        <TagBox>
          <TagStyle>커플여행</TagStyle>
          <TagStyle>관광</TagStyle>
          <TagStyle>휴식</TagStyle>
          <TagStyle>바다여행</TagStyle>
        </TagBox>
      </Box>
      <DaySchedule>
        {destinations.map((destination, index) => (
          <Box key={index}>
            <DaySummary selectedDay={`Day ${index + 1}`} destinations={destination} />
          </Box>
        ))}
      </DaySchedule>
      <Box width="980px" display="flex" justifyContent="flex-end" mt="-10">
        <Buttons text="일정 상세보기" size="sm" />
      </Box>

      <Divider mt="50px" />
      <DayReviews />
    </Box>
  )
}

export default ReviewDetailPage

export const DayReviews = () => {
  return (
    <Box mt="10" display="flex">
      <ImageSlider />
      <Box width="500px" ml="45px">
        <Text color="gray.500" fontSize="12px" mt="15px">
          2024.03.05
        </Text>
        <Heading size="lg" mt="2">
          Review Title
        </Heading>
        <Text width="500px" mt="20px">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio sapiente, at assumenda maiores error ab
          aspernatur enim mollitia, consectetur quo ex beatae! Iusto natus consequuntur error ipsa quo maiores
          explicabo! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita eaque saepe quia quam. Ipsum
          voluptatum provident molestias. Nesciunt dignissimos corporis rem, numquam, cumque, nulla minima
          necessitatibus cupiditate laudantium repellat quo!
        </Text>
      </Box>
    </Box>
  )
}
