import styled from "styled-components"
import { NavLink } from "react-router-dom"
export const SideBarWrapper = styled.div`
  width: 20%;
  height: 500px;
  display: flex;
  flex-direction: column;
`

export const SideBarMenu = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
`

export const SideBarText = styled.div`
  text-align: left;
`

export const StyledNav = styled(NavLink)`
  color: #3f3f3f;
  background-color: white;
  width: 100%;

  &.active {
    color: white;
    background-color: #10bbd5;
  }
`
