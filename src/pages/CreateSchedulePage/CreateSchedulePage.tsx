import React from "react"
import { Box, Card, CardBody, Heading } from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import Buttons from "@/components/Buttons/Buttons"

const CreateSchedulePage = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box width="450px" mb="30px">
          <Heading size="md" ml="10px" mt="40px">
            새 여행일정 생성하기
          </Heading>

          <Card mt="30px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between">
              <Heading size="xs">Step 1. 지역선택</Heading>
              <FiChevronDown />
            </CardBody>
          </Card>

          <Card mt="10px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between">
              <Heading size="xs">Step 2. 날짜선택</Heading> <FiChevronDown />
            </CardBody>
          </Card>
          <Card mt="10px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between">
              <Heading size="xs">Step 3. 세부일정</Heading> <FiChevronDown />
            </CardBody>
          </Card>
          <Card mt="10px" bg="primary" borderRadius="20px" color="white">
            <CardBody display="flex" justifyContent="space-between">
              <Heading size="xs">Step 4. 게시하기</Heading> <FiChevronDown />
            </CardBody>
          </Card>
        </Box>
        <Buttons size="sm" text="임시저장" />
      </Box>
    </>
  )
}

export default CreateSchedulePage
