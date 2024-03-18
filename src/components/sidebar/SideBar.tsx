import { Flex } from "@chakra-ui/react"
import { CgProfile } from "react-icons/cg"
import { CiStar } from "react-icons/ci"
import { GrFormSchedule } from "react-icons/gr"
import {
  SideBarMenu,
  SideBarText,
  SideBarWrapper,
  StyledNav,
  MyPageLogo,
  SideBarMenus,
  SubMenuNumber
} from "@/components/Sidebar/SideBar.style"

const SideBar = () => {
  return (
    <SideBarWrapper>
      <SideBarMenus>
        <Flex width="100%" flexDir="column" alignItems="center">
          <MyPageLogo>My Page</MyPageLogo>
          <StyledNav to="/profile">
            <SideBarMenu>
              <CgProfile />
              <SideBarText>내 프로필</SideBarText>
            </SideBarMenu>
          </StyledNav>
          <StyledNav to="/schedule">
            <SideBarMenu>
              <GrFormSchedule />
              <SideBarText>내 여행일정</SideBarText>
              <SubMenuNumber>3</SubMenuNumber>
            </SideBarMenu>
          </StyledNav>
          <StyledNav to="/favorite">
            <SideBarMenu>
              <CiStar />
              <SideBarText>내 즐겨찾기</SideBarText>
              <SubMenuNumber>10</SubMenuNumber>
            </SideBarMenu>
          </StyledNav>
        </Flex>
      </SideBarMenus>
    </SideBarWrapper>
  )
}

export default SideBar
