import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Heading, Text, Spinner, useToast, Button } from "@chakra-ui/react"
import axios from "axios"

const ScheduleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>() // URL에서 id 파라미터 추출
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [scheduleDetails, setScheduleDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // 수정할 내용을 관리하는 상태
  const [editedScheduleDetails, setEditedScheduleDetails] = useState<any>({
    title: "",
    startDate: "",
    endDate: "",
    region: "",
    schedules: []
  })

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("accessToken") // 토큰을 로컬 스토리지에서 가져옴
      try {
        const response = await axios.get(`https://ke4f765103c24a.user-app.krampoline.com/api/plans/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Authorization 헤더에 토큰 추가
          }
        })
        setScheduleDetails(response.data.data)
        setEditedScheduleDetails(response.data.data) // 수정할 내용 상태 초기화
        setIsLoading(false)
      } catch (error) {
        setError("Failed to fetch data")
        setIsLoading(false)
      }
    }

    fetchScheduleDetails()
  }, [id])

  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedScheduleDetails((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }

  // 수정 내용을 서버에 전송하는 함수
  const handlePatchSchedule = async () => {
    try {
      const token = localStorage.getItem("accessToken") // 토큰을 로컬 스토리지에서 가져옴
      const response = await axios.patch(
        `https://ke4f765103c24a.user-app.krampoline.com/api/plans/${id}`,
        editedScheduleDetails,
        {
          headers: {
            Authorization: `Bearer ${token}` // Authorization 헤더에 토큰 추가
          }
        }
      )
      // 수정 성공 토스트 메시지 표시
      toast({
        title: "일정 수정 완료",
        description: "일정이 성공적으로 수정되었습니다.",
        status: "success",
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      // 수정 실패 토스트 메시지 표시
      toast({
        title: "일정 수정 실패",
        description: "일정을 수정하는 동안 문제가 발생했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  }

  if (isLoading) {
    return (
      <Box textAlign="center" mt="50px">
        <Spinner size="xl" color="blue.500" />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  if (!scheduleDetails) {
    return <Box>No schedule details available.</Box>
  }

  return (
    <Box p={5}>
      <Heading size="lg">일정 수정</Heading>
      {/* 수정할 내용을 입력하는 폼 */}
      <Box mt={4}>
        <Text>제목:</Text>
        <input type="text" name="title" value={editedScheduleDetails.title} onChange={handleInputChange} />
      </Box>
      <Box mt={4}>
        <Text>시작일:</Text>
        <input type="text" name="startDate" value={editedScheduleDetails.startDate} onChange={handleInputChange} />
      </Box>
      <Box mt={4}>
        <Text>종료일:</Text>
        <input type="text" name="endDate" value={editedScheduleDetails.endDate} onChange={handleInputChange} />
      </Box>
      <Box mt={4}>
        <Text>지역:</Text>
        <input type="text" name="region" value={editedScheduleDetails.region} onChange={handleInputChange} />
      </Box>
      <Box mt={4}>
        <Button colorScheme="blue" onClick={handlePatchSchedule}>
          수정하기
        </Button>
      </Box>
    </Box>
  )
}

export default ScheduleEditPage
