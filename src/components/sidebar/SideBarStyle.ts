import styled from "styled-components"
import { NavLink } from "react-router-dom"
export const SideBarWrapper = styled.div`
  width: 20%;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-right: solid lightgrey 1px;
`
export const SideBarMenus = styled.div``

export const SideBarMenu = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: left;
  align-items: center;
  padding-left: 1rem;
`

export const MyPageLogo = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
`

export const SideBarText = styled.div`
  padding-left: 1.5rem;
`

export const StyledNav = styled(NavLink)`
  color: #3f3f3f;
  background-color: white;
  width: 100%;
  font-weight: bold;

  &.active {
    color: white;
    background-color: #10bbd5;
  }
`

export const SubMenuNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f01f1f;
  color: white;

  margin-left: 3rem;
  font-size: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
`
