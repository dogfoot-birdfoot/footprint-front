import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
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
} from "@/pages/MyPage/SideBar.style"
import { MdOutlineRateReview } from "react-icons/md"
import { useQuery } from "@tanstack/react-query"

const SideBar = () => {
  const { data: Reviews } = useQuery<any>({ queryKey: ["myReviews"] })
  const { data: MyLikeReviews } = useQuery<any>({ queryKey: ["myLikeReviews"] })

  return (
    <SideBarWrapper>
      <SideBarMenus>
        <Flex width="100%" flexDir="column" alignItems="center">
          <MyPageLogo>My Page</MyPageLogo>
          <StyledNav to="/mypage/profile">
            <SideBarMenu>
              <CgProfile />
              <SideBarText>내 프로필</SideBarText>
            </SideBarMenu>
          </StyledNav>
          <Divider />
          <Heading userSelect={"none"} color="gray" size="sm" ml="20px" mt="30px" mb="10px" width="100%">
            Schedule
          </Heading>
          <StyledNav to="/mypage/schedule">
            <SideBarMenu>
              <GrFormSchedule />
              <SideBarText>내 여행일정</SideBarText>
              <SubMenuNumber>2</SubMenuNumber>
            </SideBarMenu>
          </StyledNav>
          <StyledNav to="/mypage/favorite">
            <SideBarMenu>
              <CiStar />
              <SideBarText>내 즐겨찾기</SideBarText>
              <SubMenuNumber>1</SubMenuNumber>
            </SideBarMenu>
          </StyledNav>
          <Divider />
          <Heading userSelect={"none"} color="gray" size="sm" ml="20px" mt="30px" mb="10px" width="100%">
            Review
          </Heading>
          <StyledNav to="/mypage/review">
            <SideBarMenu>
              <MdOutlineRateReview />
              <SideBarText>내 리뷰보기</SideBarText>
              <SubMenuNumber>{Reviews?.totalElements}</SubMenuNumber>
            </SideBarMenu>
          </StyledNav>
          <StyledNav to="/mypage/likeReviews">
            <SideBarMenu>
              <MdOutlineRateReview />
              <SideBarText>좋아요한 리뷰</SideBarText>
              <SubMenuNumber>{MyLikeReviews?.totalElements}</SubMenuNumber>
            </SideBarMenu>
          </StyledNav>
        </Flex>
      </SideBarMenus>
    </SideBarWrapper>
  )
}

export default SideBar
