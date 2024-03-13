import React, { useState } from "react"
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Wrap,
  WrapItem
} from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { AiOutlineBell } from "react-icons/ai"
import {
  Logo,
  MenuTitle,
  NavBarItems,
  NavBarStyle,
  StyledButton,
  StyledMenuItem
} from "@/components/styles/NavBarStyle"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

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

  return (
    <>
      <NavBarStyle>
        <Logo href="#">FootPrint</Logo>
        <NavBarItems>
          <Breadcrumb spacing="20px" separator={"|"}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/schedule_share">
                여행일정보기
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">리뷰보기</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">리뷰작성</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem style={{ marginRight: "20px" }}>
              <BreadcrumbLink>
                <Menu isLazy isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  <MenuButton onClick={handleMenuToggle}>
                    <MenuTitle isOpen={isOpen}>
                      내 여행일정
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </MenuTitle>
                  </MenuButton>
                  <MenuList minWidth="200px">
                    {/* MenuItems are not rendered unless Menu is open : is Lazy 때문에 */}
                    <StyledMenuItem href="#">일정생성</StyledMenuItem>
                    <StyledMenuItem href="#">내 여행일정 조회</StyledMenuItem>
                    <StyledMenuItem href="#">내 여행 리뷰쓰기</StyledMenuItem>
                  </MenuList>
                </Menu>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Input placeholder="Search" width="400px" marginRight="10px" borderRadius={"30px"} />
          <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Menu isOpen={bellIsOpen} onClose={() => setBellIsOpen(false)}>
              <MenuButton onClick={handleBellToggle} px={4} py={2}>
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
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
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
