import { NavLink } from "react-router-dom"

import { Flex } from "@chakra-ui/react"
import { CgProfile } from "react-icons/cg"
import { CiStar } from "react-icons/ci"
import { GrFormSchedule } from "react-icons/gr"
import { SideBarMenu, SideBarText, SideBarWrapper, StyledNav } from "@/components/sidebar/SideBarStyle"

const SideBar = () => {
  return (
    <SideBarWrapper>
      <SideBarMenu>
        <Flex width="100%" flexDir="column" alignItems="center">
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
            </SideBarMenu>
          </StyledNav>
          <StyledNav to="/favorite">
            <SideBarMenu>
              <CiStar />
              <SideBarText>내 즐겨찾기</SideBarText>
            </SideBarMenu>
          </StyledNav>
        </Flex>
      </SideBarMenu>
    </SideBarWrapper>
  )
}

export default SideBar
