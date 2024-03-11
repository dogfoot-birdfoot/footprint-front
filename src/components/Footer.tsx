import React from "react"
import { StyledFooter } from "@/components/styles/FooterStyle"

const Footer = () => {
  return <StyledFooter>&copy; {new Date().getFullYear()} DogFoot BirdFoot. All rights reserved.</StyledFooter>
}

export default Footer
