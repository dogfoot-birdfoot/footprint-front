import { useState } from "react"
import {
  ChangePasswordButton,
  ContentBody,
  ContentHeader,
  NicknameEditButton,
  Profile,
  ProfileContent,
  ProfileHeader,
  ProfileInformation,
  ProfileText,
  ProfileTitle,
  RegisterDate,
  ReviewNumber,
  UploadImageButton
} from "@/pages/MyPage/Profile/MyProfile.style"
import { Avatar } from "@chakra-ui/react"
import { MdEdit } from "react-icons/md"
import OnOffSwitch from "@/components/Switch/OnOffSwitch"

const MyProfile = () => {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false)

  return (
    <Profile>
      {/* Profile Header */}
      <ProfileHeader>
        <Avatar height="5rem" width="5rem" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <ProfileInformation>
          <ProfileTitle>
            <ProfileText>anonymous님의 프로필</ProfileText>
            <RegisterDate>가입일 23.03.06</RegisterDate>
          </ProfileTitle>
          <ReviewNumber>리뷰 24</ReviewNumber>
          <UploadImageButton>사진 업로드</UploadImageButton>
        </ProfileInformation>
        <OnOffSwitch onText="공개" offText="비공개" booleanState={visibleProfile} setBooleanState={setVisibleProfile} />
      </ProfileHeader>

      {/* Profile Body */}
      <ProfileContent>
        <ContentHeader>아이디</ContentHeader>
        <ContentBody>anonymous</ContentBody>
      </ProfileContent>
      <ProfileContent>
        <ContentHeader>
          닉네임
          <NicknameEditButton>
            <MdEdit />
          </NicknameEditButton>
        </ContentHeader>
        <ContentBody>anonymous</ContentBody>
      </ProfileContent>
      <ProfileContent>
        <ContentHeader>이메일</ContentHeader>
        <ContentBody>anonymous@gmail.com</ContentBody>
      </ProfileContent>

      <ProfileContent>
        <ContentHeader>비밀번호</ContentHeader>
        <ChangePasswordButton>비밀번호 변경</ChangePasswordButton>
        <ContentBody>**********</ContentBody>
      </ProfileContent>
    </Profile>
  )
}

export default MyProfile
