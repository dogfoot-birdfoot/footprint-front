import React from "react"
import NavBar from "./NavBar"
import { Divider } from "@chakra-ui/react"
import Footer from "./Footer"

import { Content, LayoutWrapper } from "./styles/LayoutStyle"

// eslint-disable-next-line @typescript-eslint/ban-types
const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Content>
        <NavBar />
        <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
        <main>{children}</main>
        <Footer />
      </Content>
    </LayoutWrapper>
  )
}

export default Layout
