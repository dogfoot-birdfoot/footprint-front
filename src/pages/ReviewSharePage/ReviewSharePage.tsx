import React, { useState } from "react"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { TbLoader } from "react-icons/tb"
import { Button } from "@chakra-ui/button"

// component
import { CardListBox } from "@/pages/MainPage/MainPage.style"
import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import ReviewCardItem from "@/components/Card/ReviewCardItem"
import { Box } from "@chakra-ui/react"

// custom hook
import useIntersectionObserver from "@/pages/ReviewSharePage/useIntersectionObserver"

const ReviewSharePage = () => {
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  const [data, target, hasNextPage] = useIntersectionObserver()

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
        {data &&
          data.pages.map((page, pageIndex) => {
            return page.map((item: ReviewType, itemIndex: number) => {
              return (
                <ReviewCardItem
                  key={pageIndex.toString() + itemIndex.toString()}
                  title={item.title}
                  memberId={item.memberId}
                  likes={0}
                  createdAt={"2021-03-20"}
                />
              )
            })
          })}
      </CardListBox>
      {hasNextPage && (
        <Box ref={target} width="100%" display="flex" mb="10px" justifyContent={"center"}>
          <TbLoader />
        </Box>
      )}
    </>
  )
}

export default ReviewSharePage
