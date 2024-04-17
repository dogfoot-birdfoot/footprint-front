import React from "react"
import { Button } from "@chakra-ui/button"

interface ButtonProps {
  text: string
  size: "xs" | "sm" | "md" | "lg"
  onClick?: () => void
}

const Buttons: React.FC<ButtonProps> = ({ text, size, onClick }) => {
  return (
    <Button backgroundColor="primary" onClick={onClick} color="white" size={size} borderRadius="10px">
      {/* <Button color="primary" color="white" borderRadius="10px" size={size} onClick={onClick}> */}
      {text}
    </Button>
  )
}

export default Buttons
