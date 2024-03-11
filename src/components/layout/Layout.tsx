import React from "react"
import NavBar from "@/components/NavBar"
import { Divider } from "@chakra-ui/react"
import Footer from "@/components/Footer"
import { Content, LayoutWrapper } from "@/components/styles/LayoutStyle"
import { Outlet } from "react-router"

const Layout = () => {
  return (
    <LayoutWrapper>
      <Content>
        <NavBar />
        <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
        <Outlet />
        <Footer />
      </Content>
    </LayoutWrapper>
  )
}

export default Layout
