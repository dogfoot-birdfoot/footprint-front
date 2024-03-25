import styled from "styled-components"

// isOpen 속성의 타입을 명시적으로 지정
interface MenuTitleProps {
  isOpen: boolean
}

export const MenuTitle = styled.div<MenuTitleProps>`
  display: flex;
  align-items: center;
  color: ${props => (props.isOpen ? "var(--chakra-colors-primary)" : "black")};
`

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
    text-decorate: none;
  }
`
