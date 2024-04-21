import styled from "styled-components"

export const Favorite = styled.div`
  width: 80%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FavoriteTitle = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  text-align: left;
  font-family: "Noto Sans";
  font-size: 1.3rem;
  font-weight: bold;
`
export const FavoriteList = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 4개의 열을 동일한 크기로 설정
`
