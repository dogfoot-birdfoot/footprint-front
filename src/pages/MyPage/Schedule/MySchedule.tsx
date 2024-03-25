import {
  Schedule,
  ScheduleList,
  ScheduleText,
  ScheduleTitle,
  WholeScheduleButton
} from "@/pages/MyPage/Schedule/MySchedule.style"
import { GrFormSchedule } from "react-icons/gr"
import DetailSchedule from "@/pages/MyPage/Schedule/DetailSchedule"

const MySchedule = () => {
  return (
    <Schedule>
      <ScheduleTitle>
        <ScheduleText>
          <GrFormSchedule size="1.8rem" />
          여행 일정 목록
        </ScheduleText>
        <WholeScheduleButton>전체 일정 관리</WholeScheduleButton>
      </ScheduleTitle>
      <ScheduleList>
        <DetailSchedule />
        <DetailSchedule />
        <DetailSchedule />
      </ScheduleList>
    </Schedule>
  )
}

export default MySchedule
