import SideBar from "@/components/sidebar/SideBar"
import { MyPageWrapper } from "@/styles/styles"
import { Schedule } from "@/pages/MySchedulePage/MyScheduleStyle"

const MySchedule = () => {
  return (
    <MyPageWrapper>
      <SideBar />
      <Schedule />
    </MyPageWrapper>
  )
}

export default MySchedule
