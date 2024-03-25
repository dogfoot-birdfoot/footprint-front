import React, { useState } from "react"
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
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
import { useRecoilState } from "recoil"
import { userState } from "@/hooks/loginAtom"
import { getAuth, signOut } from "firebase/auth"
import { MdLogout } from "react-icons/md"

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [bellIsOpen, setBellIsOpen] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate()
  const auth = getAuth()

  // 로그아웃 처리 함수
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null) // Recoil 상태 업데이트하여 로그아웃 상태 반영
        navigate("/login")
      })
      .catch(error => {
        console.error("Logout error:", error)
      })
  }

  // 내여행일정 메뉴 열림/닫힘 상태를 토글하는 함수
  const handleBellToggle = () => setBellIsOpen(!isOpen)
  const myScheduleContents = ["일정생성", "내 여행일정 조회", "내 여행 리뷰쓰기"]
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
              {user ? (
                <>
                  <Link to="/profile">
                    <Avatar name={user.name} src={user.avatar} />
                  </Link>
                  <IconButton
                    aria-label="로그아웃"
                    icon={<MdLogout />}
                    size="md"
                    variant="ghost" // 배경을 없애기 위해 ghost variant 사용
                    onClick={handleLogout}
                    ml={4}
                  />
                </>
              ) : (
                <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
              )}
              <Link to="/mirage_example">mirage js 예시</Link>
            </WrapItem>
          </Wrap>
        </NavBarItems>
      </NavBarStyle>
    </>
  )
}

export default NavBar
