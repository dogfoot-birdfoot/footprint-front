import styled from "styled-components"
import { FaSearch } from "react-icons/fa" // 돋보기 아이콘을 위한 리액트 아이콘 패키지

// 입력 필드와 아이콘을 포함하는 컨테이너 스타일
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
`

// 입력 필드 스타일
export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px; // 왼쪽 패딩을 늘려서 아이콘을 위한 공간 확보
  border-radius: 30px;
  border: 1px solid #ccc;

  ::placeholder {
    color: #888;
  }
`

// 아이콘 스타일
export const IconStyle = styled(FaSearch)`
  position: absolute;
  left: 15px;
  color: #888;
`
