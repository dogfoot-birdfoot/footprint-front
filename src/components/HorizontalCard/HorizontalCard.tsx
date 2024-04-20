import React from "react"
import { Card } from "@chakra-ui/card"
import { Box, Text } from "@chakra-ui/layout"
import KakaoButton from "../KakaoButton/KakaoButton"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import { Avatar } from "@chakra-ui/avatar"
import Buttons from "@/components/Buttons/Buttons"
import { Badge, Button, IconButton, useToast } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { CardInfoProps, HorizontalCardProps, ScheduleDay, ScheduleDetails, UserInfoProps } from "./type"
import { TiStarFullOutline } from "react-icons/ti"
import { FaRegThumbsUp } from "react-icons/fa"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

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
export const UserInfo: React.FC<UserInfoProps> = ({ createdAtDate }) => {
  // 'createdAtDate'를 'yyyy-MM-dd' 형식의 문자열로 변환
  const formattedDate = createdAtDate
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .replace(/\. /g, "-")
    .replace(".", "")

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mt="5">
        {/* 작성자 정보 같은 다른 정보도 이렇게 표시할 수 있습니다. */}
        <Text textAlign="end" color="gray.500" fontSize="10px" mr="5px">
          UserNickName
        </Text>
        {/* 변환된 날짜 형식을 표시 */}
        <Text textAlign="end" color="gray.500" fontSize="9px" mr="5px">
          작성일자 : {formattedDate}
        </Text>
      </Box>
      <Avatar border="2px solid white" size="md" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" mt="2" />
    </Box>
  )
}

export const ScheduleButtons = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams() // URL에서 id와 memberId 파라미터 추출

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken") // 로컬 스토리지에서 토큰 가져오기
    try {
      const response = await axios.delete(`https://ke4f765103c24a.user-app.krampoline.com/api/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // 요청 헤더에 인증 토큰 추가
        }
      })
      // 성공적으로 요청 처리
      if (response.status === 200) {
        toast({
          title: "여행 일정이 삭제되었습니다.",
          description: "일정이 성공적으로 삭제되었습니다.",
          status: "success",
          duration: 9000,
          isClosable: true
        })
        navigate("/schedule_share")
      }
    } catch (error) {
      // 에러 처리
      toast({
        title: "오류 발생",
        description: "일정 삭제에 실패했습니다. ",
        status: "error",
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <Box>
      <Box mt="6" display="flex">
        <Box mr="2">
          <Button size="xs">수정</Button>
        </Box>
        <Box mr="2">
          <Button size="xs" onClick={handleDelete}>
            삭제
          </Button>
        </Box>
        <Box mr="4">
          <Buttons text="리뷰작성" size="xs" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="10px" mb="10px" mr="15px">
        <IconButton
          mr="10px"
          aria-label="good"
          icon={<TiStarFullOutline />}
          bg="#ffe351"
          color="white"
          borderRadius="20px"
        />
        <IconButton aria-label="favorite" icon={<FaRegThumbsUp />} bg="primary" color="white" borderRadius="20px" />
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
