import React from "react"
import { Flex, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { MenuTitle } from "@/components/DropDownButton/DropDown.style"

import { DropDownCheckBoxProps } from "./type"

const DropDownCheckBox: React.FC<DropDownCheckBoxProps> = ({ title, contents }) => {
  return (
    <Menu closeOnSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton>
            <MenuTitle $isopened={isOpen}>
              {title}
              {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </MenuTitle>
          </MenuButton>
          <MenuList minWidth={"100px"} maxWidth={"240px"}>
            {/* MenuItems are not rendered unless Menu is open : is Lazy 때문에 */}
            <MenuOptionGroup type="checkbox">
              <MenuDivider />
              {contents.map((item, index) => (
                <MenuItemOption
                  key={index}
                  value={item}
                  _hover={{ bg: "primary", color: "white", textDecoration: "none" }}
                >
                  {/* onClick Handler 추가 필요 */}
                  <Flex>{item}</Flex>
                </MenuItemOption>
              ))}
              <MenuDivider />
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default DropDownCheckBox
