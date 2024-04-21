// src/types.ts
export interface PlaceDetails {
  memo: string
  cost: number
  visitTime: string
}

export interface Place {
  kakaoPlaceId: string
  placeName: string
  latitude: number
  longitude: number
  address: string
  placeDetails: PlaceDetails
}

export interface DaySchedule {
  day: number
  places: Place[]
}
export interface Schedule {
  id: number // 각 Schedule의 고유 ID
  title: string // Schedule의 제목
  startDate: string // 시작 날짜
  endDate: string // 종료 날짜
  bookMarkCount: number // 북마크 수
  likeCount: number // 좋아요 수
  author: string // 작성자
  schedules: DaySchedule[] // DaySchedule 배열로 수정
  createdAt: string
}

export interface Schedule {
  id: number // 각 Schedule의 고유 ID
  title: string // Schedule의 제목
  startDate: string // 시작 날짜
  endDate: string // 종료 날짜
  bookMarkCount: number // 북마크 수
  likeCount: number // 좋아요 수
  author: string // 작성자
  schedules: DaySchedule[] // DaySchedule 배열로 수정
  createdAt: string // 생성 날짜
}
export interface CardItemProps {
  id: number | undefined
  nickname?: string
  title: string
  dates: string
  bookMarkCount: number
  likeCount: number
  author: string
  daySchedules: DaySchedule[] // 변경된 부분
  createdAt: string
}

export interface TimelineItemProps {
  day: number
  places: Place[]
}

export interface TravelPlan {
  createdAt: string
  author: string
  nickname?: string
  likeCount: number
  bookMarkCount: number
  id?: number
  title: string
  startDate: string
  endDate: string
  region: string
  visible: boolean
  copyAllowed: boolean
  schedules: DaySchedule[]
  totalCost?: number // Optional because it's calculated on the client side
}
