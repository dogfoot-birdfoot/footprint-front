import React, { useEffect, useState } from "react"
import CardItem from "@/components/Card/CardItem"
import { CardListBox } from "@/pages/MainPage/MainPage.style"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { Button } from "@chakra-ui/button"

import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import { Link } from "react-router-dom"
import axios from "axios"

const koreanRegions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주"
]

const ScheduleSharePage = () => {
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정
  const [postedSchedules, setPostedSchedules] = useState<any[]>([])

  // 게시된 일정 정보 가져오기
  useEffect(() => {
    const getPostedSchedules = async () => {
      try {
        const response = await axios.get("/api/schedules/get")
        setPostedSchedules(response.data)
      } catch (error) {
        console.error("Failed to fetch posted schedules", error)
      }
    }

    // 페이지 렌더링 후에 게시된 일정 정보를 가져옵니다.
    getPostedSchedules()
  }, [])
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
          {koreanRegions.map(region => (
            <MenuItem key={region} onClick={() => handleMenuItemClick(region)}>
              {region}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <CardListBox>
        {postedSchedules.map((schedule, index) => (
          <Link to={`/schedule_share_detail/${schedule.id}`} key={index}>
            <CardItem
              title={schedule.title}
              dates={`${schedule.startDate} ~ ${schedule.endDate}`}
              bookMarkCount={schedule.bookMarkCount}
              likeCount={schedule.likeCount}
              //서버에 author가 없음
              author={schedule.author}
              schedules={schedule.schedules}
              createdAt={schedule.createdAt}
            />
          </Link>
        ))}
      </CardListBox>
    </>
  )
}

export default ScheduleSharePage
