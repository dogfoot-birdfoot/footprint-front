import React, { useState } from "react"
import { Box, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { StyledMenuItem } from "@/components/DropDownButton/DropDownButton.style"
import { MenuTitle } from "../NavBar/NavBar.style"
import { DropDownButtonProps } from "./type"

const DropDownButton: React.FC<DropDownButtonProps> = ({ title, contents }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  function toggleIsOpened() {
    setIsOpened(!isOpened)
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
          <Box key={index}>
            <StyledMenuItem href="#">{item}</StyledMenuItem>
          </Box>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropDownButton
