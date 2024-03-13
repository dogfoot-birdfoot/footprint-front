import styled from "styled-components"

export const StyledTag = styled.div<{ color: string; textColor: string }>`
  background-color: ${({ color }) => color || "#e0e0e0"};
  color: ${({ textColor }) => textColor || "#000"};
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
  font-size: 12px;
`
