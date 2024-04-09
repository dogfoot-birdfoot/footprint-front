import React, { useEffect, useState } from "react"
import axios from "axios" // API 요청을 위해 axios를 사용합니다.
import { Box, Divider } from "@chakra-ui/react"
import { BannerStyle, CardListBox, Title, TitleBox } from "./MainPage.style" // 스타일을 임포트합니다.
import ReviewsGallery from "./ReviewsGallery" // ReviewsGallery 컴포넌트를 임포트합니다.
import { ReviewTitle } from "./ReviewGallery.style" // 스타일을 임포트합니다.
import CardItem from "@/components/Card/CardItem"

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

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // 'api/schedules' 엔드포인트에서 여행 일정 데이터를 가져옵니다.
        const response = await axios.get("/api/schedules")
        setSchedules(response.data) // 상태를 업데이트하여 가져온 데이터를 저장합니다.
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
      </TitleBox>
      <CardListBox>
        {schedules.map(schedule => (
          <CardItem
            key={schedule.id}
            id={schedule.id}
            title={schedule.title}
            dates={`${schedule.startDate} ~ ${schedule.endDate}`}
            bookMarkCount={schedule.bookMarkCount}
            likeCount={schedule.likeCount}
            author={schedule.author} // 실제 사용 시 적절히 수정할 필요가 있습니다.
            schedules={schedule.schedules}
            createdAt={schedule.createdAt}
          />
        ))}
      </CardListBox>
      <Box display="flex" justifyContent="center" width="100%">
        <Divider orientation="horizontal" mt="20" width="400px" />
      </Box>
      <TitleBox>
        <ReviewTitle>Popular Reviews</ReviewTitle>
      </TitleBox>
      <ReviewsGallery />
    </>
  )
}

export default MainPage
