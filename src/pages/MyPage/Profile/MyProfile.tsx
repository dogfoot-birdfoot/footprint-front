import { useState } from "react"
import {
  ContentBody,
  ContentHeader,
  Profile,
  ProfileContent,
  ProfileHeader,
  ProfileInformation,
  ProfileText,
  ProfileTitle,
  RegisterDate,
  ReviewNumber
} from "@/pages/MyPage/Profile/MyProfile.style"
import { Avatar, Flex } from "@chakra-ui/react"
import OnOffSwitch from "@/components/Switch/OnOffSwitch"
import getEmail from "@/hooks/getEmail"
import { useQuery } from "@tanstack/react-query"

const MyProfile = () => {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false)
  const nickname: string | undefined = localStorage.getItem("nickname") ?? undefined
  const { data: Reviews } = useQuery<any>({ queryKey: ["myReviews"] })
  const { data: MyLikeReviews } = useQuery<any>({ queryKey: ["myLikeReviews"] })

  return (
    <Profile>
      {/* Profile Header */}
      <ProfileHeader>
        <Avatar height="4rem" width="4rem" name={nickname} />
        <ProfileInformation>
          <ProfileTitle>
            <ProfileText>{nickname}님의 프로필</ProfileText>
          </ProfileTitle>
          <Flex>
            <ReviewNumber>작성한 리뷰 {Reviews?.totalElements}개</ReviewNumber>
            <ReviewNumber>좋아요한 리뷰 {MyLikeReviews?.totalElements}개</ReviewNumber>
          </Flex>
        </ProfileInformation>
        {/* <OnOffSwitch onText="공개" offText="비공개" booleanState={visibleProfile} setBooleanState={setVisibleProfile} /> */}
      </ProfileHeader>

      {/* Profile Body */}
      <ProfileContent>
        <ContentHeader>이메일</ContentHeader>
        <ContentBody>{getEmail()}</ContentBody>
      </ProfileContent>
      <ProfileContent>
        <ContentHeader>닉네임</ContentHeader>
        <ContentBody>{nickname}</ContentBody>
      </ProfileContent>

      <ProfileContent>
        <ContentHeader>비밀번호</ContentHeader>
        <ContentBody>**********</ContentBody>
      </ProfileContent>
    </Profile>
  )
}

export default MyProfile
