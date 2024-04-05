import React, { useEffect, useRef, useState } from "react"
import CardItem from "@/components/Card/CardItem"
import { CardListBox } from "@/pages/MainPage/MainPage.style"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { Button } from "@chakra-ui/button"

import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import { Link } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import useIntersectionObserver from "./useIntersectionObserver"

const ScheduleSharePage = () => {
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  // 카드에 대한 상태 저장
  const [cardLists, setCardLists] = useState<string[][]>([
    ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"],
    ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"],
    ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"]
  ])

  const target = useRef(null)
  const [observe, unobserve] = useIntersectionObserver(addCards)

  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setSelectedItem(itemName) // 메뉴 아이템 클릭 시 상태 업데이트
  }

  function addCards() {
    setCardLists(cardLists => [
      ...cardLists,
      ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"]
    ])
  }

  useEffect(() => {
    if (target.current) {
      observe(target.current)
    }

    if (target.current && cardLists.length === 30) {
      unobserve(target.current)
    }
  }, [cardLists])

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

      {/* cardList 출력 */}
      {cardLists.map((cardList, index) => (
        <CardListBox key={index}>
          {cardList.map((item, idx) => (
            <Link key={idx} to={item}>
              <CardItem />
            </Link>
          ))}
        </CardListBox>
      ))}

      <Box ref={target} width="100%" display="flex" justifyContent={"center"} border="1px solid black">
        요소가 보이면 callback 함수 호출
      </Box>
    </>
  )
}

export default ScheduleSharePage
