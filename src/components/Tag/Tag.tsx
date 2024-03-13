import React from "react"
import { StyledTag } from "./Tag.style"

interface TagProps {
  text: string
  color?: string
  textColor?: string
}

const Tag: React.FC<TagProps> = ({ text, color = "#e0e0e0", textColor = "#000" }) => {
  return (
    <StyledTag color={color} textColor={textColor}>
      {text}
    </StyledTag>
  )
}

export default Tag
