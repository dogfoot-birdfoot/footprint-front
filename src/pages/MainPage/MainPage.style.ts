import styled from "styled-components"

export const BannerStyle = styled.div`
  display: flex;
  justify-content: center;
`
export const Title = styled.h1`
  margin-left: 20px;
  margin-top: 10px;
  font-size: 30px;
  font-family: "Lobster";
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
