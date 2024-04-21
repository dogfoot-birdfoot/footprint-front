import React from "react"
import NavBar from "@/components/navBar/NavBar"
import Footer from "@/components/Footer/Footer"
import { Divider } from "@chakra-ui/react"

import { Content, LayoutWrapper } from "@/components/Layout/Layout.style"

import { Outlet } from "react-router"

const Layout = () => {
  // 최상위 레이아웃
  return (
    <LayoutWrapper>
      <Content>
        <NavBar />
        <Divider style={{ marginTop: "10px", marginBottom: "20px" }} />
        <Outlet />
      </Content>
      <Footer />
    </LayoutWrapper>
  )
}

export default Layout
