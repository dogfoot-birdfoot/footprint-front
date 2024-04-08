import React, { useEffect, useState } from "react"
import CardItem from "@/components/Card/CardItem"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { Button } from "@chakra-ui/button"

import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import axios from "axios"
import { SimpleGrid } from "@chakra-ui/react"

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

  useEffect(() => {
    const getPostedSchedules = async () => {
      try {
        const response = await axios.get("/api/schedules/get")
        // 여기서 visible이 true인 항목만 필터링
        const visibleSchedules = response.data.filter((schedule: { visible: boolean }) => schedule.visible === true)
        setPostedSchedules(visibleSchedules)
      } catch (error) {
        console.error("Failed to fetch posted schedules", error)
      }
    }

    getPostedSchedules()
  }, [])

  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setSelectedItem(itemName)
  }
  const filteredSchedules = postedSchedules.filter(
    schedule => selectedItem === "전국" || schedule.region === selectedItem
  )

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

      <SimpleGrid minChildWidth="300px" spacing="15px">
        {filteredSchedules.map(schedule => (
          <CardItem
            key={schedule.id}
            id={schedule.id} // 각 CardItem에 id 전달
            title={schedule.title}
            dates={`${schedule.startDate} ~ ${schedule.endDate}`}
            bookMarkCount={schedule.bookMarkCount}
            likeCount={schedule.likeCount}
            author={schedule.author}
            schedules={schedule.schedules}
            createdAt={schedule.createdAt}
          />
        ))}
      </SimpleGrid>
    </>
  )
}

export default ScheduleSharePage
