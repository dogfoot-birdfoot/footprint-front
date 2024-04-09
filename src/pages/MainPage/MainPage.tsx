import React, { useEffect, useState } from "react"
import axios from "axios" // API 요청을 위해 axios를 사용합니다.
import { Box, Divider, Text } from "@chakra-ui/react"
import { BannerStyle, CardListBox, Title, TitleBox } from "./MainPage.style" // 스타일을 임포트합니다.
import ReviewsGallery from "./ReviewsGallery" // ReviewsGallery 컴포넌트를 임포트합니다.
import { ReviewTitle } from "./ReviewGallery.style" // 스타일을 임포트합니다.
import CardItem from "@/components/Card/CardItem"
import { useNavigate } from "react-router-dom"

// CardItemProps.ts
export interface PlaceDetail {
  memo: string
  cost: number
}

export interface Place {
  placeName: string
  placeDetails: PlaceDetail[]
}

export interface Schedule {
  id: number // 각 Schedule의 고유 ID
  title: string // Schedule의 제목
  startDate: string // 시작 날짜
  endDate: string // 종료 날짜
  bookMarkCount: number // 북마크 수
  likeCount: number // 좋아요 수
  author: string // 작성자
  schedules: {
    // 하루의 여행 일정
    day: number
    places: Place[]
  }[]
  createdAt: string // 생성 날짜
}

export interface CardItemProps {
  id: number
  title: string
  dates: string
  bookMarkCount: number
  likeCount: number
  author: string
  schedules: Schedule[]
  createdAt: string
}

const MainPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const navigate = useNavigate() // useNavigate 훅을 사용해 navigate 함수를 초기화합니다.

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("/api/schedules")
        setSchedules(response.data) // 가져온 데이터를 상태에 저장합니다.
      } catch (error) {
        console.error("Failed to fetch schedules:", error)
      }
    }

    fetchSchedules()
  }, [])

  return (
    <>
      <BannerStyle>
        <img src="/mainImage.jpg" alt="mainImage" width={"80%"} />
      </BannerStyle>
      <TitleBox>
        <Title>Latest Plans</Title>
        <Box display="flex" justifyContent="center" mt={4}>
          <Text mt={3} cursor="pointer" textDecoration="underline" onClick={() => navigate("/schedule_share")}>
            View All
          </Text>
        </Box>
      </TitleBox>
      <CardListBox>
        {schedules.slice(0, 8).map(
          (
            schedule // 최대 8개의 스케줄만 표시합니다.
          ) => (
            <CardItem
              key={schedule.id}
              id={schedule.id}
              title={schedule.title}
              dates={`${schedule.startDate} ~ ${schedule.endDate}`}
              bookMarkCount={schedule.bookMarkCount}
              likeCount={schedule.likeCount}
              author={schedule.author}
              schedules={schedule.schedules}
              createdAt={schedule.createdAt}
            />
          )
        )}
      </CardListBox>

      <TitleBox>
        <Title>Best Plans</Title>
        <Box display="flex" justifyContent="center" mt={4}>
          <Text mt={3} cursor="pointer" textDecoration="underline" onClick={() => navigate("/schedule_share")}>
            View All
          </Text>
        </Box>
      </TitleBox>
      <CardListBox>
        {schedules.slice(0, 8).map(
          (
            schedule // 최대 8개의 스케줄만 표시합니다.
          ) => (
            <CardItem
              key={schedule.id}
              id={schedule.id}
              title={schedule.title}
              dates={`${schedule.startDate} ~ ${schedule.endDate}`}
              bookMarkCount={schedule.bookMarkCount}
              likeCount={schedule.likeCount}
              author={schedule.author}
              schedules={schedule.schedules}
              createdAt={schedule.createdAt}
            />
          )
        )}
      </CardListBox>

      <Box display="flex" flexDirection="column" alignItems="center" mt={20} mb={20}>
        <Divider width="400px" mb={4} />
        <ReviewTitle>Popular Reviews</ReviewTitle>
      </Box>
      <ReviewsGallery />
    </>
  )
}

export default MainPage
