import SideBar from "@/components/sidebar/SideBar"
import { MyPageWrapper } from "@/styles/styles"
import {
  Schedule,
  ScheduleList,
  ScheduleText,
  ScheduleTitle,
  WholeScheduleButton
} from "@/pages/MySchedulePage/MySchedule.style"
import { GrFormSchedule } from "react-icons/gr"
import DetailSchedule from "./DetailSchedule"

const MySchedule = () => {
  return (
    <MyPageWrapper>
      <SideBar />
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
    </MyPageWrapper>
  )
}

export default MySchedule
