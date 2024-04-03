import React from "react"
import { Flex, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { MenuTitle } from "@/components/DropDownButton/DropDown.style"

import { DropDownRadioBoxProps } from "./type"

const DropDownRadioBox: React.FC<DropDownRadioBoxProps> = ({ title, contents }) => {
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
            <MenuOptionGroup title="내 일정" type="radio">
              <MenuDivider />
              {contents.map((item, index) => (
                <MenuItemOption
                  key={index}
                  value={item}
                  _hover={{ bg: "primary", color: "white", textDecoration: "none" }}
                >
                  {/* onClick Handler 추가 필요 */}
                  <Flex justifyContent={"center"}>{item}</Flex>
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default DropDownRadioBox
