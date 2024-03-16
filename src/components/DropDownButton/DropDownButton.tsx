import React, { useState } from "react"
import { Box, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { StyledMenuItem } from "@/components/DropDownButton/DropDownButton.style"
import { MenuTitle } from "../NavBar/NavBar.style"
import { DropDownButtonProps } from "./type"
import { useNavigate } from "react-router-dom"

const DropDownButton: React.FC<DropDownButtonProps> = ({ title, contents }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const navigate = useNavigate()

  function toggleIsOpened() {
    setIsOpened(!isOpened)
  }

  const handleMenuItemClick = (path: string) => {
    navigate(path) // 클릭된 항목의 path로 이동합니다.
    setIsOpened(false) // 메뉴 닫기
  }

  return (
    <Menu isLazy isOpen={isOpened} onClose={() => setIsOpened(false)}>
      <MenuButton onClick={toggleIsOpened}>
        <MenuTitle isOpen={isOpened}>
          {title}
          {isOpened ? <FiChevronUp /> : <FiChevronDown />}
        </MenuTitle>
      </MenuButton>
      <MenuList minWidth="140px">
        {/* MenuItems are not rendered unless Menu is open : is Lazy 때문에 */}

        {contents.map((item, index) => (
          <Box key={index} onClick={() => handleMenuItemClick(item.path)}>
            <StyledMenuItem>{item.title}</StyledMenuItem>
          </Box>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropDownButton
