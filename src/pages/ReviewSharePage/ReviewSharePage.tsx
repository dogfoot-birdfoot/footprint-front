import React, { useState } from "react"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { TbLoader } from "react-icons/tb"
import { Button } from "@chakra-ui/button"

// component
import { CardListBox } from "@/pages/MainPage/MainPage.style"
import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import ReviewCardItem from "@/components/Card/ReviewCardItem"
import { Box, Heading, Text } from "@chakra-ui/react"

// custom hook
import useIntersectionObserver from "@/pages/ReviewSharePage/useIntersectionObserver"
import { Link } from "react-router-dom"

const ReviewSharePage = () => {
  const [data, target, hasNextPage] = useIntersectionObserver()
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setSelectedItem(itemName) // 메뉴 아이템 클릭 시 상태 업데이트
  }

  return (
    <>
      <Heading userSelect="none" size="sm" mt="50px" ml="30px" mb="10px">
        리뷰 전체 보기
      </Heading>
      <CardListBox>
        {data?.pages &&
          data?.pages.map((page, pageIndex) => {
            return page.map((item: ReviewType, itemIndex: number) => {
              return (
                <Link key={pageIndex.toString() + itemIndex.toString()} to={`/review/${item.reviewId}`}>
                  <ReviewCardItem
                    title={item.title}
                    nickname={item.nickname}
                    memberId={item.memberId}
                    likes={item.likes}
                    createdAt={new Date(item.createdAt)}
                    previewImage={item.previewImageUrl}
                  />
                </Link>
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
