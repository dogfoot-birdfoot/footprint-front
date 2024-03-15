import React, { useState } from "react"
import { Box, Card, CardBody, Heading } from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import AddDestination from "./AddDestination"
import Calendar from "./Calendar"
import AddSchedule from "./AddSchedule"
import AddPost from "./AddPost"

export interface CreateScheduleFormProps {
  selectedDates: Date[]
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>
  showSearchBox: boolean // 부모 컴포넌트로부터 전달받을 새로운 prop
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>> // 부모 컴포넌트로부터 전달받을 새로운 prop
}

const CreateScheduleForm: React.FC<CreateScheduleFormProps> = ({
  selectedDates,
  setSelectedDates,
  showSearchBox,
  setShowSearchBox
}) => {
  const [isDestinationBoxVisible, setIsDestinationBoxVisible] = useState(false)
  const [isCalendarBoxVisible, setIsCalendarBoxVisible] = useState(false)
  const [isScheduleBoxVisible, setIsScheduleBoxVisible] = useState(false)
  const [isPostBoxVisible, setIsPostBoxVisible] = useState(false)

  const updateSelectedDates = (dates: Date[]) => {
    setSelectedDates(dates)
  }

  const DestinationToggleBox = () => {
    setIsDestinationBoxVisible(!isDestinationBoxVisible)
  }
  const CalendarToggleBox = () => {
    setIsCalendarBoxVisible(!isCalendarBoxVisible)
  }
  const ScheduleToggleBox = () => {
    setIsScheduleBoxVisible(!isScheduleBoxVisible)
  }
  const PostToggleBox = () => {
    setIsPostBoxVisible(!isPostBoxVisible)
  }
  return (
    <>
      <>
        <Box width="450px" mb="30px">
          <Heading size="md" ml="10px" mt="40px">
            새 여행일정 생성하기
          </Heading>

          <Card mt="30px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between" onClick={DestinationToggleBox}>
              <Heading size="xs">Step 1. 지역선택</Heading>
              <FiChevronDown />
            </CardBody>
          </Card>
          {isDestinationBoxVisible && (
            <Card mt="10px">
              <CardBody>
                <AddDestination />
              </CardBody>
            </Card>
          )}

          <Card mt="10px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between" onClick={CalendarToggleBox}>
              <Heading size="xs">Step 2. 날짜선택</Heading> <FiChevronDown />
            </CardBody>
          </Card>
          {isCalendarBoxVisible && (
            <Card mt="10px">
              <CardBody display="flex" justifyContent="center">
                <Calendar updateSelectedDates={updateSelectedDates} />
              </CardBody>
            </Card>
          )}
          <Card mt="10px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between" onClick={ScheduleToggleBox}>
              <Heading size="xs">Step 3. 세부일정</Heading> <FiChevronDown />
            </CardBody>
          </Card>
          {isScheduleBoxVisible && (
            <Card mt="10px">
              <CardBody>
                <AddSchedule dates={selectedDates} showSearchBox={showSearchBox} setShowSearchBox={setShowSearchBox} />
              </CardBody>
            </Card>
          )}

          <Card mt="10px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between" onClick={PostToggleBox}>
              <Heading size="xs">Step 4. 게시하기</Heading> <FiChevronDown />
            </CardBody>
          </Card>
          {isPostBoxVisible && (
            <Card mt="10px">
              <CardBody>
                <AddPost />
              </CardBody>
            </Card>
          )}
        </Box>
      </>
    </>
  )
}

export default CreateScheduleForm
