import React, { useState } from "react"
import { Box, BreadcrumbLink, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { StyledMenuItem } from "@/components/DropDownButton/DropDownButton.style"
import { MenuTitle } from "../NavBar/NavBar.style"
import { DropDownButtonProps } from "./type"
import { Link } from "react-router-dom"

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
            <Link to={`/${item[1]}`}>
              <StyledMenuItem href="#">{item[0]}</StyledMenuItem>
            </Link>
          </Box>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropDownButton
