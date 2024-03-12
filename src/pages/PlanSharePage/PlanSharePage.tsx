import React, { useState } from "react"
import CardItem from "@/components/card/CardItem"
import { CardListBox } from "@/styles/MainPageStyle"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"

const PlanSharePage = () => {
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setSelectedItem(itemName) // 메뉴 아이템 클릭 시 상태 업데이트
  }
  return (
    <>
      <Menu>
        <MenuButton>현재지역 : {selectedItem}</MenuButton>

        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick("전국")}>전국</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("가평,양평")}>가평,양평</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("강릉,속초")}>강릉,속초</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("경주")}>경주</MenuItem>
        </MenuList>
      </Menu>
      <CardListBox>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </CardListBox>

      <CardListBox>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </CardListBox>
    </>
  )
}

export default PlanSharePage
