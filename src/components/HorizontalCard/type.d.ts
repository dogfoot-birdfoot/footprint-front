export interface CardInfoProps {
  title?: string
  ml_size: string
  scheduleDetails: ScheduleDetails | undefined // scheduleDetails 속성 추가
}
export interface HorizontalCardProps {
  scheduleDetails: ScheduleDetails
  size: string
}
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

export interface UserInfoProps {
  createdAtDate: Date
}
