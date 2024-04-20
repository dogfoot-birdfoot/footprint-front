import React, { useEffect, useRef, useState } from "react"
import CardItem from "@/components/Card/CardItem"
import { Menu, MenuButton, MenuItem, MenuList, MenuGroup } from "@chakra-ui/menu"
import { FiChevronDown } from "react-icons/fi"
import { Button } from "@chakra-ui/button"
import { SortButton } from "@/pages/ScheduleSharePage/ScheduleSharePage.style"
import { SimpleGrid } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import useIntersectionObserver from "./useIntersectionObserver"
import { Schedule, TravelPlan } from "./type"
import { Link, useNavigate } from "react-router-dom"
import { TbLoader } from "react-icons/tb"
import getMemberId from "@/hooks/getMemberId"
import { koreanRegions } from "@/styles/config"
import { CardListBox } from "../MainPage/MainPage.style"

const ScheduleSharePage = () => {
  const memberId = getMemberId() // 예시입니다. 실제 값에 맞게 조정하세요.
  const [selectedItem, setSelectedItem] = useState("전국") // 초기 상태를 '전국'으로 설정

  const [plans, setPlans] = useState<TravelPlan[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch(
        "https://ke4f765103c24a.user-app.krampoline.com/api/plans?page=0&size=10&sort=id,desc"
      )
      const data = await response.json()
      setPlans(data.data.content)
    }
    fetchPlans()
  }, [])

  const handleCardClick = (id: number) => {
    // id 타입을 number로 명시합니다.
    if (id !== undefined) {
      navigate(`/schedule_share_detail/${id}`)
    }
  }
  // 카드에 대한 상태 저장
  const [cardLists, setCardLists] = useState<string[][]>([
    ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"],
    ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"],
    ["/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail", "/schedule_share_detail"]
  ])

  const [data, target, hasNextPage] = useIntersectionObserver()

  const handleMenuItemClick = (itemName: React.SetStateAction<string>) => {
    setSelectedItem(itemName)
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

        <MenuList
          id="menuList"
          minWidth="150px"
          maxHeight="200px"
          overflowY={"scroll"}
          css={{
            "&::-webkit-scrollbar": {
              width: "5px",
              borderRadius: "2px"
            },
            "&::-webkit-scrollbar-thumb": {
              color: "white",
              backgroundColor: "var(--chakra-colors-primary)",
              borderRadius: "5px"
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "white"
            }
          }}
        >
          <MenuItem justifyContent={"center"} onClick={() => handleMenuItemClick("전국")}>
            전국
          </MenuItem>

          {koreanRegions.map(region => (
            <MenuItem justifyContent={"center"} key={region} onClick={() => handleMenuItemClick(region)}>
              {region}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <CardListBox>
        {data &&
          data.pages.map((page, pageIndex) => {
            return page?.map((schedule: TravelPlan, itemIndex: number) => {
              return selectedItem === "전국" || selectedItem === schedule.region ? (
                <Link key={schedule.id} to={`/schedule_share_detail/${schedule.id}/member/${memberId}`}>
                  <CardItem
                    id={schedule.id}
                    title={schedule.title}
                    dates={`${schedule.startDate} ~ ${schedule.endDate}`}
                    bookMarkCount={schedule.bookMarkCount}
                    likeCount={schedule.likeCount}
                    author={schedule.author}
                    daySchedules={schedule.schedules}
                    createdAt={schedule.createdAt}
                  />
                </Link>
              ) : undefined
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

export default ScheduleSharePage
