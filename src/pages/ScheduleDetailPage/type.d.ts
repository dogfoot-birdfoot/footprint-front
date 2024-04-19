// PlaceDetail 인터페이스 정의
export interface PlaceDetail {
  memo: string
  cost: number
  visitTime: string
}

// Place 인터페이스 정의
export interface Place {
  latitude: number
  longitude: number
  placeName: string
  placeDetails: PlaceDetail // 배열 대신 객체로 정의
}

// 다른 인터페이스들은 그대로 유지
export interface ScheduleDay {
  day: number
  places: Place[]
}

export interface ScheduleDetails {
  tags: string[]
  title: string
  startDate: string
  endDate: string
  region: string
  schedules: ScheduleDay[]
  totalBudget: number
  likeCount: number
  bookMarkCount: number
  createdAt: string
}
