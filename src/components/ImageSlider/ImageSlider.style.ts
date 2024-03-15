import styled from "styled-components"

export const SliderContainer = styled.div`
  position: relative;
  width: 500px
  height: 400px;
  overflow: hidden;
`

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ImageNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 5%;
  right: 5%;
`

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: white;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; /* 아이콘 크기를 조정 */

  &:hover {
    background-color: var(--chakra-colors-primary); /* 여기서 'primary'는 프로젝트의 테마에 따른 색상입니다 */
  }

  &.left {
    left: 16px;
  }

  &.right {
    right: 16px;
  }
`
