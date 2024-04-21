import React, { useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import { durationTime } from "@/styles/config"

const ScheduleEditPage = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()
  const scheduleDetails = location.state?.scheduleDetails || { title: "", startDate: "", endDate: "" }
  const [editedData, setEditedData] = useState(scheduleDetails)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      const response = await axios.patch(
        `https://ke4f765103c24a.user-app.krampoline.com/api/plans/${editedData.id}`,
        editedData
      )
      if (response.status === 200) {
        toast({
          title: "일정 수정 성공",
          description: "일정이 성공적으로 수정되었습니다.",
          status: "success",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
        navigate("/schedules") // 수정 후 일정 목록 페이지 등으로 리디렉트
      }
    } catch (error) {
      toast({
        title: "일정 수정 실패",
        description: `일정 수정 중 오류가 발생했습니다: ${error.message}`,
        status: "error",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editedData.title}
        onChange={e => setEditedData({ ...editedData, title: e.target.value })}
      />
      <input
        type="date"
        value={editedData.startDate}
        onChange={e => setEditedData({ ...editedData, startDate: e.target.value })}
      />
      <input
        type="date"
        value={editedData.endDate}
        onChange={e => setEditedData({ ...editedData, endDate: e.target.value })}
      />
      <button type="submit">저장하기</button>
    </form>
  )
}

export default ScheduleEditPage
