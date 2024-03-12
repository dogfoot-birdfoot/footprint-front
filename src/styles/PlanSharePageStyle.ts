import styled from "styled-components"

export const SortButton = styled.button`
  padding: 4px 16px; // px={4} py={2}을 rem 단위로 변환
  transition: all 0.2s;
  border-radius: 4px; // borderRadius="md"의 대략적인 값
  border-width: 1px;
  border-style: solid;
  border-color: transparent; // 기본 테두리 색상 설정

  &:hover {
    background-color: #3182ce; // blue.400의 대략적인 hex 값
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6); // boxShadow="outline"의 대략적인 스타일
    outline: none; // 기본 outline 제거
  }
`
