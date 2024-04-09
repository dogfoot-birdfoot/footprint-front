import styled from "styled-components"

export const Logo = styled.a`
  margin-left: 20px;

  margin-top: 10px;
  font-size: 40px;
  font-family: "Courgette";
`

export const NavBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flow-start;
`

export const NavBarItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 0px 100px;
  height: 60px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
`

export const StyledButton = styled.button`
  /* 추가적인 스타일 */
  border: gray 1px solid;
  background-color: white;
  color: gray;
  padding: 7px 20px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--chakra-colors-primary);
    color: white;
    border: none;
  }
`

// 메뉴 아이템 스타일 정의
export const StyledMenuItem = styled.a`
  display: block;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  color: black; //
  text-decoration: none;

  &:hover {
    background-color: var(--chakra-colors-primary);
    color: white;
  }
`
