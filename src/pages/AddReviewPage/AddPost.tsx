import { Box, Button, Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react"
import React, { useState } from "react"
import { ImageSlider } from "@/components/ImageSlider/ImageSlider"
import OnOffSwitch from "@/components/Switch/OnOffSwitch"
import DropDownButton from "@/components/DropDownButton/DropDownButton"

const AddPost = () => {
  const [openRegionSelector, setOpenRegionSelector] = useState<boolean>(false)
  const [openTagSelector, setOpenTagSelector] = useState<boolean>(false)

  function handleRegionSelector() {
    setOpenRegionSelector(!openRegionSelector)
  }

  function handleTagSelector() {
    setOpenTagSelector(!openTagSelector)
  }

  const editableProps = {
    width: "320px",
    height: "320px",
    fontSize: "13px",
    whiteSpace: "pre-wrap",
    padding: "5px 5px 5px 5px"
  }

  const [notify, setNotify] = useState<boolean>(false)
  const [visiblePost, setVisiblePost] = useState<boolean>(false)

  const regionContents = [
    ["서울", ""],
    ["경기", ""],
    ["대구", ""],
    ["부산", ""],
    ["대전", ""],
    ["인천", ""],
    ["광주", ""]
  ]
  const tagContents = [
    ["휴식", ""],
    ["관광", ""],
    ["혼자 여행", ""],
    ["우정 여행", ""],
    ["커플 여행", ""],
    ["가족 여행", ""]
  ]
  const scheduleContents = [
    ["일정 1", ""],
    ["일정 2", ""],
    ["일정 3", ""],
    ["일정 4", ""],
    ["일정 5", ""],
    ["일정 6", ""]
  ]

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      <Box width="320px" margin="0px 10px 0px 0px">
        <ImageSlider size="sm" />
        <Box display="flex" justifyContent="space-between" marginTop="10px" alignItems="center">
          <Box>
            <OnOffSwitch onText="알림" offText="" booleanState={notify} setBooleanState={setNotify} />
            <OnOffSwitch onText="공개" offText="" booleanState={visiblePost} setBooleanState={setVisiblePost} />
          </Box>

          <Box width="100px" display="flex" justifyContent="space-between">
            <DropDownButton title="지역" contents={regionContents} />
            <DropDownButton title="태그" contents={tagContents} />
          </Box>
        </Box>
      </Box>
      <Box width="320px">
        <Editable
          width="320px"
          height="320px"
          defaultValue="문구를 입력하세요."
          border="1px solid lightgray"
          borderRadius="10px"
          selectAllOnFocus={false}
        >
          <EditablePreview {...editableProps} overflow={"hidden"} />
          <EditableTextarea {...editableProps} resize="none" maxLength={300} />
        </Editable>
        <Box display="flex" justifyContent="flex-end" marginTop="10px">
          <DropDownButton title="내 일정과 연결" contents={scheduleContents} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button backgroundColor="primary" color="white" marginTop="10px" marginRight="20px">
          POST
        </Button>
      </Box>
    </Box>
  )
}

export default AddPost
