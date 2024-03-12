import SideBar from "@/components/sidebar/SideBar"
import { MyPageWrapper } from "@/styles/MyPageStyle"
import { Profile } from "@/pages/ProfilePage/MyProfileStyle"

const MyProfile = () => {
  return (
    <MyPageWrapper>
      <SideBar />
      <Profile></Profile>
    </MyPageWrapper>
  )
}

export default MyProfile
