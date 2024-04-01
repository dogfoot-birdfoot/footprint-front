import OnOffSwitch from "@/components/Switch/OnOffSwitch"
import React, { useState } from "react"
import { Box, Heading, Input, Text, Tag, useColorModeValue, SimpleGrid, Button } from "@chakra-ui/react"

// Recoil
import { useRecoilState } from "recoil"
import { copyAllowedState, visibleState } from "@/pages/CreateSchedulePage/atom"

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

// 선택된 태그를 관리하는 상태의 타입 정의
interface SelectedTags {
  [key: string]: boolean
}

const AddPost: React.FC = () => {
  // 태그의 선택 상태를 저장하는 상태 변수
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({})

  // 게시글 공개 여부, 복사 여부를 설정하는 변수
  const [postVisible, setPostVisible] = useRecoilState(visibleState)
  const [copyAllowed, setCopyAllowed] = useRecoilState(copyAllowedState)

  // 태그 클릭 핸들러 함수
  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prevState => ({
      ...prevState,
      [tag]: !prevState[tag]
    }))
  }

  // Chakra UI에서 사용할 수 있는 색상 훅
  const tagBg = useColorModeValue("gray.500", "gray.500") // 기본 태그 배경색
  const selectedTagBg = useColorModeValue("primary", "primary") // 선택된 태그 배경색
  return (
    <>
      <Box>
        <Heading size="sm" color="textColor">
          제목
        </Heading>
        <Input mt="10px" type="text" placeholder="여행 제목을 입력하세요." />
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
          <Button color="white" bgColor="primary" _hover={{ bgColor: "secondary" }} w="160px">
            게시하기
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default AddPost
