import styled from "styled-components"

export const ReviewBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

export const ReviewItem = styled.div`
  margin-left: 20px;
  position: relative;
`
export const ReviewImage = styled.img`
  width: 250px; // 너비 설정
  height: 250px; // 높이 설정
  object-fit: cover;
  transition: transform 0.3s ease-in-out; // 트랜지션 효과 설정

  &:hover {
    transform: scale(1.16); // 마우스 호버 시 이미지 확대
  }
`

export const ImageTag = styled.span`
  position: absolute;
  top: 0; // 컨테이너의 맨 위
  left: 0; // 컨테이너의 맨 왼쪽
  z-index: 10; // 다른 요소들 위에 태그가 표시되도록 z-index 설정
  background-color: rgba(255, 255, 255, 0.7); // 배경색 지정 (부분적으로 투명)
  padding: 5px; // 패딩 추가
  font-size: 12px; // 폰트 사이즈 지정
  border-radius: 5px; // 모서리 둥글게
`
