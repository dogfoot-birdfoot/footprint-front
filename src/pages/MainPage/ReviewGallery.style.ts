import styled, { css } from "styled-components"

export const ReviewBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

export const DetailInfo = styled.div`
  position: absolute;
  bottom: 0; // 이미지 하단에 위치
  left: 0;
  width: 100%; // ReviewItem의 너비와 동일하게 설정
  background-color: rgba(0, 0, 0, 0.7); // 상세 정보 배경색
  color: #fff; // 상세 정보 텍스트 색상
  padding: 10px; // 내부 여백
  opacity: 0; // 기본적으로 보이지 않음
  visibility: hidden; // 기본적으로 숨김
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  // transition을 사용하여 부드러운 효과 적용
  font-size: 8px;
`

export const ReviewItem = styled.div`
  margin-left: 20px;
  position: relative;
  width: 250px; // 초기 너비 설정
  height: 250px; // 초기 높이 설정
  transition: transform 0.3s ease-in-out; // 트랜지션 효과 설정

  &:hover {
    transform: scale(1.16); // 마우스 호버 시 컨테이너(이미지와 태그 포함) 확대

    // DetailInfo 컴포넌트를 호버 시 보이도록 설정
    ${DetailInfo} {
      opacity: 1;
      visibility: visible;
    }
  }
`

export const ReviewTitle = styled.h1`
  text-align: center;
  font-size: 30px;
  font-family: "Lobster";
`

export const ReviewImage = styled.img`
  width: 100%; // 컨테이너의 너비에 맞춤
  height: 100%; // 컨테이너의 높이에 맞춤
  object-fit: cover;
  // 이미지 자체에는 transform 효과를 제거합니다.
`

const commonTagStyles = css`
  position: absolute;
  top: 10px;
  z-index: 10;
  background-color: #10bbd5;
  color: white;
  padding: 5px;
  font-size: 11px;
  border-radius: 10px;
`

export const ImageTag = styled.span`
  ${commonTagStyles} // 공통 스타일 적용
  left: 10px; // ImageTag 고유의 스타일
`

export const ImageTag2 = styled.span`
  ${commonTagStyles} // 공통 스타일 적용
  left: 65px; // ImageTag2 고유의 스타일
`
