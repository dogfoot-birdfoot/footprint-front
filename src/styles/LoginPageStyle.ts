import { Link } from "react-router-dom"
import styled from "styled-components"

export const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

export const ImageContainer = styled.div`
  width: 50%; // 이미지 영역의 너비를 전체 공간의 50%로 설정
  max-width: 500px; // 이미지 영역의 최대 너비를 500px로 제한
  display: flex;
  justify-content: center; // 이미지를 중앙에 위치시킴
`

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vh;
`

export const LoginCard = styled.div`
  padding: 24px;
  margin: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 560px;
  text-align: center;
`

export const LoginTitle = styled.h1`
  font-size: 26px;
  font-weight: bold;
  font-family: "Lobster";
  margin-bottom: 24px;
`

export const LoginStyledLink = styled(Link)`
  color: #454545;
  &:hover {
    color: #0056b3;
  }
`
export const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

export const KakaoLoginButton = styled.button`
  background-color: #ffe351; // 카카오톡 공식 노란색
  color: #000000; // 텍스트 색상은 검정색
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px; // 다른 버튼과의 간격
  width: 100%; // 부모 요소의 전체 너비를 차지하도록 설정
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center; // 버튼 내의 아이템들을 세로 중앙 정렬
  justify-content: center; // 버튼 내의 아이템들을 가로 중앙 정렬
  gap: 10px; // 아이콘과 텍스트 사이의 간격

  &:hover {
    background-color: #fee500;
  }
`

export const LoginForm = styled.form`
  space-y-4;
`

export const LoginInput = styled.input`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  focus: outline-none;
  focus: ring-2;
  focus: ring-blue-500;
  focus: border-transparent;
  margin-bottom: 16px; // space-y-4 대신 사용
`

export const LoginButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  background-color: #10bbd5;
  color: white;
  border-radius: 8px;
  &:hover {
    background-color: #2a97c5;
  }
`
