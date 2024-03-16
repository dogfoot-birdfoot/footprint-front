import React, { useState } from "react"
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Menu,
  MenuButton,
  MenuList,
  Wrap,
  WrapItem
} from "@chakra-ui/react"
import { AiOutlineBell } from "react-icons/ai"
import { Logo, NavBarItems, NavBarStyle, StyledButton, StyledMenuItem } from "@/components/NavBar/NavBar.style"
import { useNavigate } from "react-router"
import { Link, NavLink } from "react-router-dom"
import {} from "react-router-dom"
import SearchBar from "./SearchBar"
import DropDownButton from "../DropDownButton/DropDownButton"

// NavBar 컴포넌트를 정의합니다.
// React.FC<NavBarProps>를 사용하여 NavBar 컴포넌트의 props 타입을 지정합니다.
const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [bellIsOpen, setBellIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  //로그인상태관리 (진짜로 로그인되면 아바타가 바뀌도록 수정해야함)
  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate("/login")
  }

  // 내여행일정 메뉴 열림/닫힘 상태를 토글하는 함수
  const handleMenuToggle = () => setIsOpen(!isOpen)
  const handleBellToggle = () => setBellIsOpen(!isOpen)
  const myScheduleContents = [
    { title: "일정생성", path: "/create_schedule" },
    { title: "내 여행일정 조회", path: "/schedule_share_detail" },
    { title: "내 여행 리뷰쓰기", path: "/addreview" }
  ]
  return (
    <>
      <NavBarStyle>
        <Logo href="/">
          <img src="footprintlogo.png" width="150px" />
        </Logo>
        <NavBarItems>
          <Breadcrumb spacing="20px" separator={"|"}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/schedule_share">
                여행일정보기
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/review_share">
                리뷰보기
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/addreview">
                리뷰작성
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem style={{ marginRight: "20px" }}>
              <BreadcrumbLink>
                <DropDownButton title="내 여행일정" contents={myScheduleContents} />
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <SearchBar />
          <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Menu isOpen={bellIsOpen} onClose={() => setBellIsOpen(false)}>
              <MenuButton onClick={handleBellToggle} px={1} py={2}>
                <AiOutlineBell size="25px" color={bellIsOpen ? "var(--chakra-colors-primary)" : "gray"} />
              </MenuButton>
              <MenuList>
                {/* menu Item이 동적으로 들어와야함 */}
                <StyledMenuItem>OO님이 user nickname 님의 게시물을 즐겨찾기했습니다.</StyledMenuItem>
                <StyledMenuItem>OO님이 user nickname 님의 게시물을 좋아요했습니다.</StyledMenuItem>
                <StyledMenuItem>OO님이 user nickname 님의 게시물을 즐겨찾기했습니다.</StyledMenuItem>
                <StyledMenuItem>OO님이 user nickname 님의 게시물을 좋아요했습니다.</StyledMenuItem>
              </MenuList>
            </Menu>
          </div>
          <Wrap>
            <WrapItem>
              {isLoggedIn ? (
                <NavLink to="/profile">
                  <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                </NavLink>
              ) : (
                <StyledButton onClick={handleLogin}>Login</StyledButton>
              )}
            </WrapItem>
          </Wrap>
        </NavBarItems>
      </NavBarStyle>
    </>
  )
}

export default NavBar
