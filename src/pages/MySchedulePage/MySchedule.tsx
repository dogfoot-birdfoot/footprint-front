import SideBar from "@/components/sidebar/SideBar"
import { MyPageWrapper } from "@/styles/styles"
import { Schedule } from "@/pages/MySchedulePage/MySchedule.style"

const MySchedule = () => {
  return (
    <MyPageWrapper>
      <SideBar />
      <Schedule />
    </MyPageWrapper>
  )
}

export default MySchedule
