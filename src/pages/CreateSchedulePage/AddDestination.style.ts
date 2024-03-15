import styled from "styled-components"

export const RegionBox = styled.div<{ isSelected: boolean }>`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border: 0.5px solid #ccc;
  border-radius: 20px;
  background-color: ${props => (props.isSelected ? "var(--chakra-colors-primary)" : "#fff")};
  color: ${props => (props.isSelected ? "#fff" : "var(--chakra-colors-textColor)")};
`
