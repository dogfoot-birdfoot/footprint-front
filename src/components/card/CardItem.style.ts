import styled from "styled-components"

// 이미지와 아바타를 감싸는 컨테이너에 대한 스타일
export const ImageContainer = styled.div`
  position: relative;
  width: 330px; // 이미지 너비에 맞춰 조정
  height: 250px; // 이미지 높이에 맞춰 조정
  display: flex; // Flexbox 레이아웃 사용
  justify-content: center; // 중앙 정렬
  align-items: flex-center;
`

// 아바타 위치를 지정하기 위한 스타일
export const PositionedAvatar = styled.div`
  position: absolute;
  right: 8px;
  bottom: 15px;
`
