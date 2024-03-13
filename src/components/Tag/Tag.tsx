import React from "react"
import styled from "styled-components"

interface TagProps {
  text: string // Tag에 표시할 텍스트
  color?: string // Tag의 배경색, 옵션
  textColor?: string // Tag의 텍스트 색상, 옵션
}

const StyledTag = styled.div<{ color: string; textColor: string }>`
  background-color: ${({ color }) => color || "#e0e0e0"};
  color: ${({ textColor }) => textColor || "#000"};
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
  font-size: 12px;
`

const Tag: React.FC<TagProps> = ({ text, color = "#e0e0e0", textColor = "#000" }) => {
  return (
    <StyledTag color={color} textColor={textColor}>
      {text}
    </StyledTag>
  )
}

export default Tag
