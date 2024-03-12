import { NavLink } from "react-router-dom"

import { Flex } from "@chakra-ui/react"
import { CgProfile } from "react-icons/cg"
import { CiStar } from "react-icons/ci"
import { GrFormSchedule } from "react-icons/gr"
import { SideBarMenu, SideBarText, SideBarWrapper } from "@/components/sidebar/SideBarStyle"

const SideBar = () => {
  return (
    <SideBarWrapper>
      <SideBarMenu>
        <Flex flexDir="column" alignItems="center">
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? "green" : "blue"
            })}
          >
            <SideBarMenu>
              <CgProfile />
              <SideBarText>내 프로필</SideBarText>
            </SideBarMenu>
          </NavLink>
          <NavLink
            to="/schedule"
            style={({ isActive }) => ({
              color: isActive ? "green" : "blue"
            })}
          >
            <SideBarMenu>
              <GrFormSchedule />
              <SideBarText>내 여행일정</SideBarText>
            </SideBarMenu>
          </NavLink>
          <NavLink
            to="/favorite"
            style={({ isActive }) => ({
              color: isActive ? "green" : "blue"
            })}
          >
            <SideBarMenu>
              <CiStar />
              <SideBarText>내 즐겨찾기</SideBarText>
            </SideBarMenu>
          </NavLink>
        </Flex>
      </SideBarMenu>
    </SideBarWrapper>
  )
}

export default SideBar
