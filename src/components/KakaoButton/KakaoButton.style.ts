import styled from "styled-components"

export const KakaoButtonStyle = styled.button`
  background-color: #ffe351; // 카카오톡 공식 노란색
  color: var(--chakra-colors-textColor); // 텍스트 색상은 검정색
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%; // 부모 요소의 전체 너비를 차지하도록 설정
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center; // 버튼 내의 아이템들을 세로 중앙 정렬
  justify-content: center; // 버튼 내의 아이템들을 가로 중앙 정렬
  gap: 10px; // 아이콘과 텍스트 사이의 간격

  &:hover {
    background-color: #fee500;
  }
`
