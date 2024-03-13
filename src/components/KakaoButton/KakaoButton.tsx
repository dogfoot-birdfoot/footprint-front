import React from "react"
import { KakaoButtonStyle } from "./KakaoButton.style"
import { ImBubble } from "react-icons/im"

interface KakaoButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const KakaoButton: React.FC<KakaoButtonProps> = ({ onClick, children }) => {
  return (
    <KakaoButtonStyle onClick={onClick}>
      <ImBubble />
      {children}
    </KakaoButtonStyle>
  )
}

export default KakaoButton
