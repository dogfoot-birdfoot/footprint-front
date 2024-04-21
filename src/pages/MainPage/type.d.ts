import { DaySchedule } from "../ScheduleSharePage/type"

export interface Schedule {
  id: number // 각 Schedule의 고유 ID
  nickname?: string
  title: string // Schedule의 제목
  startDate: string // 시작 날짜
  endDate: string // 종료 날짜
  bookMarkCount: number // 북마크 수
  likeCount: number // 좋아요 수
  author: string // 작성자
  schedules: DaySchedule[] // DaySchedule 배열로 수정
  createdAt: string
}
