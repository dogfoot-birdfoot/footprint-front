import styled from "styled-components"

export const MyPageWrapper = styled.div`
  width: 1280px;
  display: flex;
  justify-content: center;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 80%;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans";
`

export const ProfileHeader = styled.div`
  display: flex;
  width: 80%;
`
export const ProfileInformation = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
export const ProfileTitle = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  font-size: 1.5rem;
`
export const ProfileText = styled.div`
  font-weight: bold;
`

export const RegisterDate = styled.div`
  color: #3f3f3f;
  font-weight: 600;
  margin-left: 0.1rem;
  margin-bottom: 0.1rem;
  font-size: 0.7rem;
`
export const ReviewNumber = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
`

export const UploadImageButton = styled.button`
  margin-top: 0.5rem;
  width: 3rem;
  font-size: 0.5rem;
  border: 1px solid lavender;
  border-radius: 0.2rem;
`

export const ProfileContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 80%;
  margin-top: 1rem;
  border-radius: 1rem;
  padding: 0.5rem 0 0.5rem 1rem;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  // backdrop-filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
`

export const NicknameEditButton = styled.button``
export const ChangePasswordButton = styled.button`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 4rem;
  transform: translate(0%, 25%);
  border-radius: 3px;
  font-size: 0.7rem;
`
export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  font-size: 0.9;
  font-weight: bold;
`

export const ContentBody = styled.div`
  width: 100%;
  display: flex;
  font-size: 0.8rem;
`
