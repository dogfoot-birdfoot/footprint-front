import OnOffSwitch from "@/components/Switch/OnOffSwitch"
import React, { useState } from "react"
import { Box, Heading, Input, Text, Tag, useColorModeValue, SimpleGrid, Button, useToast } from "@chakra-ui/react"

// Recoil
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import {
  titleState,
  fromDateState,
  toDateState,
  regionState,
  visibleState,
  copyAllowedState,
  scheduleState,
  selectedTagsState,
  placesByDateState,
  allDates
} from "@/hooks/atom"
import { redirect, useNavigate } from "react-router-dom"
import useCustomFetch from "@/hooks/useCustomFetch"
import getMemberId from "@/hooks/getMemberId"

// 태그 배열의 타입 정의
const tagArray: string[] = [
  "가족여행",
  "커플여행",
  "단체여행",
  "혼자여행",
  "관광",
  "휴식",
  "맛집투어",
  "유적지",
  "바다여행",
  "산여행",
  "액티비티",
  "낚시,캠핑"
]

const AddPost: React.FC = () => {
  const navigate = useNavigate()
  const memberId = getMemberId()
  const [title, setTitle] = useRecoilState(titleState)
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState)
  const toast = useToast()
  const customFetch = useCustomFetch

  // 게시글 공개 여부, 복사 여부를 설정하는 변수
  const [postVisible, setPostVisible] = useRecoilState(visibleState)
  const [copyAllowed, setCopyAllowed] = useRecoilState(copyAllowedState)
  const fromDate = useRecoilValue(fromDateState)
  const toDate = useRecoilValue(toDateState)
  const regions = useRecoilValue(regionState)
  const visible = useRecoilValue(visibleState)
  const placesByDate = useRecoilValue(placesByDateState)

  const resetTitle = useResetRecoilState(titleState)
  const resetFromDate = useResetRecoilState(fromDateState)
  const resetToDate = useResetRecoilState(toDateState)
  const resetRegions = useResetRecoilState(regionState)
  const resetVisible = useResetRecoilState(visibleState)
  const resetCopyAllowed = useResetRecoilState(copyAllowedState)
  const resetSchedules = useResetRecoilState(scheduleState)
  const resetPlacesByDate = useResetRecoilState(placesByDateState)
  const resetAllDates = useResetRecoilState(allDates)
  const tagBg = useColorModeValue("gray.500", "gray.500")
  const selectedTagBg = useColorModeValue("primary", "primary")

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async () => {
    // 사용자에게 확인 대화 상자 표시
    setShowConfirmation(true)
  }

  // 확인 대화 상자에서 확인을 클릭한 경우
  const handleConfirmSubmit = async () => {
    // 확인 대화 상자를 닫음
    setShowConfirmation(false)

    // 데이터 제출
    try {
      // 데이터 전송 로직
      resetTitle()
      resetFromDate()
      resetToDate()
      resetRegions()
      resetVisible()
      resetCopyAllowed()
      resetSchedules()
      resetPlacesByDate()
      resetAllDates()
      setSelectedTags({})
      // 추가적인 Recoil 상태 초기화
      window.location.reload()
    } catch (error) {
      console.error("Failed to create schedule", error)
      toast({
        title: "여행 일정 생성 실패",
        description: "일정 생성 중 오류가 발생했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      })
    }
  }

  // 확인 대화 상자에서 취소를 클릭한 경우
  const handleCancelSubmit = () => {
    setShowConfirmation(false)
  }

  // 태그 클릭 핸들러 함수
  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prevState => ({
      ...prevState,
      [tag]: !prevState[tag]
    }))
  }

  return (
    <>
      <Box>
        <Heading size="sm" color="textColor">
          제목
        </Heading>
        {/* 수정된 부분: title 상태를 직접 설정 */}
        <Input
          mt="10px"
          type="text"
          placeholder="여행 제목을 입력하세요."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt="10px">
          <Box mt="10px">
            <Heading size="sm" color="textColor">
              내 여행일정 공개 설정
            </Heading>
            <Text fontSize="10px" color="textColor" mt="7px">
              여행일정을 누구나 열람 할 수 있게 공개합니다.
            </Text>
          </Box>
          <Box mt="10px">
            <OnOffSwitch
              onText={"공개"}
              offText={"비공개"}
              booleanState={postVisible}
              setBooleanState={setPostVisible}
            ></OnOffSwitch>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box mt="10px">
            <Heading size="sm" color="textColor">
              내 여행일정 복사 여부
            </Heading>
            <Text fontSize="10px" color="textColor" mt="7px">
              타인이 나의 여행일정을 복사해서 사용할 수 있게 합니다.
            </Text>
          </Box>
          <Box mt="10px">
            <OnOffSwitch
              onText={"가능"}
              offText={"불가능"}
              booleanState={copyAllowed}
              setBooleanState={setCopyAllowed}
            ></OnOffSwitch>
          </Box>
        </Box>
        <Heading size="sm" color="textColor" mt="10px">
          태그 설정
        </Heading>
        <SimpleGrid columns={4} spacing={1} mt="10px">
          {tagArray.map((tag, index) => (
            <Box key={index}>
              <Tag
                color="white"
                onClick={() => toggleTagSelection(tag)}
                bg={selectedTags[tag] ? selectedTagBg : tagBg}
                cursor="pointer"
                borderRadius="full"
                minW="80px"
                maxW="80px"
                m={1}
                display="flex"
                justifyContent="center"
              >
                {tag}
              </Tag>
            </Box>
          ))}
        </SimpleGrid>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button color="white" bgColor="primary" _hover={{ bgColor: "secondary" }} w="160px" onClick={handleSubmit}>
            게시하기
          </Button>
          <Button onClick={() => navigate("/check")}>게시된 정보 조회</Button>
        </Box>
      </Box>
      {/* 확인 대화 상자 */}
      {showConfirmation && (
        <Box position="fixed" top="0" left="0" width="100%" height="100%" bg="rgba(0, 0, 0, 0.5)" zIndex="9999">
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p="4"
            borderRadius="md"
          >
            <Text mb="2">여행 일정을 게시하시겠습니까?</Text>
            <Box display="flex" justifyContent="space-between">
              <Button colorScheme="green" onClick={handleConfirmSubmit}>
                확인
              </Button>
              <Button colorScheme="red" onClick={handleCancelSubmit}>
                취소
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default AddPost
