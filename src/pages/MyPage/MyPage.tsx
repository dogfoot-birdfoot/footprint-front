import SideBar from "@/pages/MyPage/SideBar"
import { Outlet } from "react-router-dom"
import { MyPageWrapper } from "@/pages/MyPage/MyPage.style"

const MyPage = () => {
  return (
    <MyPageWrapper>
      <SideBar />
      <Outlet />
    </MyPageWrapper>
  )
}

export default MyPage
