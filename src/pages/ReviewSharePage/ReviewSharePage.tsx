import React, { useState } from "react"
import CardItem from "@/components/Card/CardItem"
import { CardListBox } from "@/pages/MainPage/MainPage.style"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { Button } from "@chakra-ui/button"

import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import { Link } from "react-router-dom"
import ReviewCardItem from "@/components/Card/ReviewCardItem"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const ReviewSharePage = () => {
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ["reviews"], queryFn: getReviews })

  async function getReviews() {
    const data = await fetch("https://k903c4c87638da.user-app.krampoline.com/api/reviews")
      .then(response => response.json())
      .then(data => data.content)
    return data
  }

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
        <Link to="/review_share_detail">
          <ReviewCardItem />
        </Link>
        <ReviewCardItem />
        <ReviewCardItem />
        <ReviewCardItem />
      </CardListBox>

      <CardListBox>
        <ReviewCardItem />
        <ReviewCardItem />
        <ReviewCardItem />
        <ReviewCardItem />
      </CardListBox>
      {/* {Object.values(query.data).map((value, idx) => {
        return <ReviewCardItem key={idx} />

        if (idx % 4 == 0) return <CardListBox></CardListBox>
      })} */}
    </>
  )
}

export default ReviewSharePage
