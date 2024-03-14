import React, { useState } from "react"
import CardItem from "@/components/Card/CardItem"
import { CardListBox } from "@/pages/MainPage/MainPage.style"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { Button } from "@chakra-ui/button"

import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import { Link } from "react-router-dom"

const ReviewSharePage = () => {
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setSelectedItem(itemName) // 메뉴 아이템 클릭 시 상태 업데이트
  }

  return (
    <>
      <Menu>
        <SortButton>
          <MenuButton as={Button} rightIcon={<FiChevronDown />} bg="primary" color="white" _hover={{ bg: "secondary" }}>
            {" "}
            현재지역 : {selectedItem}
          </MenuButton>
        </SortButton>
        {/* 추후 메뉴 list를 동적으로 받아와야함 */}
        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick("전국")}>전국</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("가평,양평")}>가평,양평</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("강릉,속초")}>강릉,속초</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("경주")}>경주</MenuItem>
        </MenuList>
      </Menu>
      <CardListBox>
        {/* 나중에는 링크를 동적으로 받아와야함 */}
        <Link to="/schedule_share_detail">
          <CardItem />
        </Link>
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

export default ReviewSharePage
