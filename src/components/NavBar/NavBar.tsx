import React, { useState } from "react"
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
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
import { FiLogOut } from "react-icons/fi" // 로그아웃 아이콘 임포트
import SearchBar from "./SearchBar"
import DropDownButton from "../DropDownButton/DropDownButton"
import axios from "axios"
import { useRecoilState } from "recoil"
import { userState } from "@/hooks/atom"

const NavBar: React.FC = () => {
  const [bellIsOpen, setBellIsOpen] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate()

  //로그인상태관리 (진짜로 로그인되면 아바타가 바뀌도록 수정해야함)
  // async function handleLogin() {
  //   const response = await axios.get("https://8c06cf14-ea25-4277-9986-7ac417192ce0.mock.pstmn.io/detail-schedule")
  //   console.log(response)
  //   setIsLoggedIn(true)
  //   navigate("/login")
  // }

  // 내여행일정 메뉴 열림/닫힘 상태를 토글하는 함수
  const handleBellToggle = () => setBellIsOpen(!bellIsOpen)
  const myScheduleContents = [
    ["일정생성", "create_schedule"],
    ["내 여행일정 조회", "mypage/schedule"],
    ["내 여행 리뷰쓰기", "addreview"]
  ]

  const handleLogout = () => {
    // 여기에 로그아웃 처리 로직을 추가하세요.
    // 예: 사용자 상태를 null로 설정하고 로그인 페이지로 리디렉션
    setUser(null) // setUser는 useRecoilState(userState)로부터 얻은 setter 함수
    navigate("/login") // 로그인 페이지로 리디렉션
  }

  return (
    <>
      <NavBarStyle>
        <Logo href="/">
          <img src={`${process.env.PUBLIC_URL}/footprintlogo.png`} width="150px" />
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
              {user ? (
                <>
                  <NavLink to="/mypage/profile">
                    <Avatar name={user.nickname} src={user.profilePicture} size="sm" />
                  </NavLink>
                  <FiLogOut
                    onClick={handleLogout}
                    style={{ cursor: "pointer", marginLeft: "30px", marginTop: "7px" }}
                    size={20}
                  />
                </>
              ) : (
                <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
              )}
            </WrapItem>
          </Wrap>
        </NavBarItems>
      </NavBarStyle>
      <Button as={Link} to="/mirage_example">
        go to mirage
      </Button>
    </>
  )
}

export default NavBar
