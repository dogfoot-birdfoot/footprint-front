import { Box, Button, Editable, EditablePreview, EditableTextarea, Input, useQuery } from "@chakra-ui/react"
import React, { useState } from "react"
import { ImageSlider } from "@/components/ImageSlider/ImageSlider"
import OnOffSwitch from "@/components/Switch/OnOffSwitch"
import DropDownCheckBox from "@/components/DropDownButton/DropDownCheckBox"
import DropDownRadioBox from "@/components/DropDownButton/DropDownRadioBox"
import { AddPostProps } from "./type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const editableProps = {
  width: "320px",
  height: "270px",
  fontSize: "13px",
  whiteSpace: "pre-wrap",
  padding: "10px 10px 10px 10px"
}

const AddPost: React.FC<AddPostProps> = ({ sources, previewImages }) => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [notify, setNotify] = useState<boolean>(false)
  const [visiblePost, setVisiblePost] = useState<boolean>(false)

  const regionContents = ["서울", "경기", "대구", "부산", "대전", "광주"]
  const scheduleContents = ["일정 1", "일정 2", "일정 3", "일정 4", "일정 5", "일정 6"]

  // React-Query
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ReviewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      setContent("1")
      setTitle("2")
    }
  })

  async function ReviewPost() {
    try {
      // sources.map((item, idx) => {
      //   const formData = new FormData()
      //   formData.append("file", item)

      //   await fetch(`${process.env.REACT_APP_API_URL}/api/images`, {
      //     method: "post",
      //     body: formData
      //   }).then(result => console.log("요청성공"))
      // })

      await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberId: 1,
          title: title,
          content: content,
          imageIds: sources
        })
      }).then(response => console.log(response))
    } catch (error) {
      console.error("Failed to create review", error)
    }
  }

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      <Box width="320px" margin="0px 10px 0px 0px">
        <ImageSlider images={previewImages} size="sm" />
        <Box display="flex" justifyContent="space-between" marginTop="10px" alignItems="center">
          <Box>
            <OnOffSwitch onText="공개" offText="" booleanState={visiblePost} setBooleanState={setVisiblePost} />
          </Box>

          <Box width="50px" display="flex" justifyContent="space-between">
            <DropDownCheckBox title="지역" contents={regionContents} />
          </Box>
        </Box>
      </Box>
      <Box width="320px">
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          paddingLeft="10px"
          marginBottom="10px"
          placeholder="제목"
          fontSize={"sm"}
          color="black"
        />
        <Editable
          width="322px"
          height="272px"
          placeholder="문구를 입력하세요."
          _placeholder={{ color: "green" }}
          border="1px solid lightgray"
          borderRadius="10px"
          selectAllOnFocus={false}
        >
          <EditablePreview {...editableProps} color="gray" overflow={"hidden"} />
          <EditableTextarea
            {...editableProps}
            value={content}
            //onChange={e => setContent(e.target.value)}
            resize="none"
            maxLength={300}
          />
        </Editable>
        <Box display="flex" justifyContent="flex-end" marginTop="10px">
          <DropDownRadioBox title="내 일정과 연결" contents={scheduleContents} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          onClick={() => {
            mutation.mutate()
          }}
          backgroundColor="primary"
          color="white"
          marginTop="10px"
          marginRight="20px"
        >
          POST
        </Button>
      </Box>
    </Box>
  )
}

export default AddPost
