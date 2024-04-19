import styled from "styled-components"

export const BannerStyle = styled.div`
  display: flex;
  justify-content: center;
  position: relative; // 상대 위치 설정
  cursor: pointer;
`
export const TypingText = styled.div`
  font-size: 24px;
  font-family: "Gowun Batang", serif;
  font-weight: bold;
  color: var(--chakra-colors-primary);
  position: absolute;
  bottom: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  /* 텍스트가 튀는 효과를 위한 키 프레임 */
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-30px);
    }
    60% {
      transform: translateX(-50%) translateY(-15px);
    }
  }

  animation: bounce 2s infinite;
`

export const Title = styled.h1`
  margin-left: 20px;
  margin-top: 10px;
  font-size: 30px;
  font-family: "Courgette";
`

export const TitleBox = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
`

export const CardListBox = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: -50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4개의 열을 동일한 크기로 설정
  gap: 20px; // 아이템 사이의 간격
`
