import React, { useState } from "react"
import { Card } from "@chakra-ui/card"
import { Box, Text } from "@chakra-ui/layout"
import KakaoButton from "../KakaoButton/KakaoButton"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import { Avatar } from "@chakra-ui/avatar"
import { Badge, Button, IconButton, useToast } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { CardInfoProps, HorizontalCardProps, ScheduleDay, UserInfoProps } from "./type"
import { TiStarFullOutline } from "react-icons/ti"
import { FaRegThumbsUp } from "react-icons/fa"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import getMemberId from "@/hooks/getMemberId"
import useCustomFetch from "@/hooks/useCustomFetch"
import { durationTime } from "@/styles/config"

// 카카오톡으로 일정을 공유하는 함수
const shareScheduleWithKakao = () => {
  // 여기에 카카오톡 공유 로직을 구현합니다.
  console.log("카카오톡으로 일정 공유하기")
}

export const HorizontalCardContent: React.FC<HorizontalCardProps> = ({ size, scheduleDetails }) => {
  const mlsize: string = size === "lg" ? "50px" : "10px"
  const numberWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const calculateTotalCost = (schedules: ScheduleDay[]): string => {
    let totalCost = 0

    schedules.forEach(schedule => {
      schedule.places.forEach(place => {
        // placeDetails 객체에서 cost 속성에 직접 접근
        totalCost += place.placeDetails.cost
      })
    })

    return numberWithCommas(totalCost) + "원"
  }

  return (
    <>
      <Box display="flex" mt="20px" mb="20px" alignItems="center" ml="30px">
        <Box>
          <CardInfo ml_size={mlsize} scheduleDetails={scheduleDetails} />
          <Box width="260px" ml={mlsize} mt="10px">
            <Text color="gray.500" fontSize="12px" ml="5px" mt="1">
              총 예상 경비 : {calculateTotalCost(scheduleDetails.schedules)}
            </Text>

            <Box mt="5" width="100%">
              <KakaoButton onClick={shareScheduleWithKakao}>카카오톡으로 일정 공유하기</KakaoButton>
            </Box>
            <TagBox>{scheduleDetails.tags && <TagStyle>{scheduleDetails.tags}</TagStyle>}</TagBox>
            <UserInfo createdAtDate={new Date(scheduleDetails.createdAt)} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const CardInfo: React.FC<CardInfoProps> = ({ ml_size, scheduleDetails }) => {
  // scheduleDetails가 undefined일 경우를 대비한 조기 반환
  if (!scheduleDetails) {
    return <div></div> // 또는 원하는 다른 플레이스홀더 표시
  }

  const calculateTripDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const durationInDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (durationInDays === 0) {
      return "1일 여행"
    } else if (durationInDays === 1) {
      return "1박 2일"
    } else {
      return `${durationInDays}박 ${durationInDays + 1}일`
    }
  }

  return (
    <>
      <Box width="260px" ml={ml_size} mt="10px">
        <Box mt="-2" display="flex">
          <Badge variant="subtle" colorScheme="green" minWidth="50px" mt="5">
            {calculateTripDuration(scheduleDetails?.startDate, scheduleDetails?.endDate)}
          </Badge>

          {/* 다른 정보도 이렇게 표시할 수 있습니다. */}
          <Text color="gray.500" fontSize="10px" ml="5px" mt="6">
            {scheduleDetails.startDate} ~ {scheduleDetails.endDate}
          </Text>
        </Box>
        <Heading
          size="md"
          mt="2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "18ch" // 18글자를 넘어가면 잘라내고 "..." 표시
          }}
        >
          {scheduleDetails.title}
        </Heading>
      </Box>
    </>
  )
}
export const UserInfo: React.FC<UserInfoProps> = () => {
  const formatDate = (date: string | number | Date) => {
    return new Date(date)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
      .replace(/\. /g, "-")
      .replace(/\./, "") // 점과 공백을 대시로 대체
  }

  const currentDateString = formatDate(new Date()) // 현재 날짜를 문자열로 포맷
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mt="5">
        {/* 작성자 정보 같은 다른 정보도 이렇게 표시할 수 있습니다. */}
        <Text textAlign="end" color="gray.500" fontSize="10px" mr="5px">
          UserNickName
        </Text>
        {/* 변환된 날짜 형식을 표시 */}
        <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
          작성일자 : {formatDate(currentDateString)}
        </Text>
      </Box>
      <Avatar border="2px solid white" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" mt="2" />
    </Box>
  )
}

export const ScheduleButtons = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams()
  const memberId = getMemberId()

  const likePlan = async () => {
    const response = await useCustomFetch(
      `https://ke4f765103c24a.user-app.krampoline.com/api/plans/like/${id}?memberId=${memberId}`,
      { method: "POST" }
    )
    if (response.ok) {
      toast({
        title: "좋아요!",
        description: "이 여행계획을 좋아합니다.",
        status: "success",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to like the plan.",
        status: "error",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    }
  }

  const bookmarkPlan = async () => {
    const response = await useCustomFetch(
      `https://ke4f765103c24a.user-app.krampoline.com/api/bookmarks/${id}?memberId=${memberId}`,
      { method: "POST" }
    )
    if (response.ok) {
      toast({
        title: "즐겨찾기",
        description: "여행계획이 즐겨찾기 되었습니다.",
        status: "success",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to bookmark the plan.",
        status: "error",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    }
  }

  const unbookmarkPlan = async () => {
    try {
      const response = await useCustomFetch(
        `https://ke4f765103c24a.user-app.krampoline.com/api/bookmarks/${id}?memberId=${memberId}`,
        { method: "DELETE" }
      )
      if (response.ok) {
        toast({
          title: "즐겨찾기 취소",
          description: "여행계획의 즐겨찾기가 취소되었습니다.",
          status: "success",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
      } else {
        toast({
          title: "Error",
          description: "즐겨찾기 취소에 실패했습니다.",
          status: "error",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Network error or server issue.",
        status: "error",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    }
  }
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://ke4f765103c24a.user-app.krampoline.com/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (response.status === 200) {
        toast({
          title: "여행계획 삭제",
          description: "여행계획이 삭제되었습니다.",
          status: "success",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
        navigate("/schedule_share")
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to delete the travel plan.",
        status: "error",
        duration: durationTime,
        isClosable: true
      })
    }
  }

  const handleEditClick = () => {
    navigate(`/schedule/${id}/edit`)
  }

  const [isBookmarked, setIsBookmarked] = useState(false)

  const toggleBookmark = () => {
    if (isBookmarked) {
      unbookmarkPlan()
    } else {
      bookmarkPlan()
    }
    setIsBookmarked(!isBookmarked)
  }
  return (
    <Box>
      <Box mt="6" display="flex">
        <Box mr="2">
          <Button size="xs" backgroundColor="#10bdd5" color="white" onClick={handleEditClick}>
            수정
          </Button>
        </Box>
        <Box mr="2">
          <Button size="xs" onClick={handleDelete} backgroundColor="#10bdd5" color="white">
            삭제
          </Button>
        </Box>
        <Box mr="4">
          <Button
            size="xs"
            backgroundColor="#10bdd5"
            color="white"
            onClick={() =>
              toast({ title: "리뷰 작성 준비중!", status: "info", duration: durationTime, isClosable: true })
            }
          >
            리뷰작성
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="10px" mb="10px" mr="15px">
        <IconButton
          aria-label={isBookmarked ? "Unbookmark" : "Bookmark"}
          icon={isBookmarked ? <TiStarFullOutline /> : <TiStarFullOutline />}
          bg={isBookmarked ? "#ffe351" : "gray"}
          color="white"
          borderRadius="20px"
          onClick={toggleBookmark}
          marginRight="10px"
        />
        <IconButton
          aria-label="Bookmark"
          icon={<FaRegThumbsUp />}
          bg="primary"
          color="white"
          borderRadius="20px"
          onClick={likePlan}
        />
      </Box>
    </Box>
  )
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({ scheduleDetails }) => {
  return (
    <>
      <Card
        justifyContent="space-between"
        width="1040px"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        {/* HorizontalCardContent 컴포넌트에 scheduleDetails를 props로 전달 */}
        <HorizontalCardContent size="lg" scheduleDetails={scheduleDetails} />
        {/* 게시자에게만 보이도록 로직 수정 */}
        <ScheduleButtons />
      </Card>
    </>
  )
}

export default HorizontalCard
