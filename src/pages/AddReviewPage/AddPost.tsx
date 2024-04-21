import { Box, Button, Editable, EditablePreview, EditableTextarea, Input, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { ImageSlider } from "@/components/ImageSlider/ImageSlider"
import OnOffSwitch from "@/components/Switch/OnOffSwitch"
import DropDownRadioBox from "@/components/DropDownButton/DropDownRadioBox"
import { AddPostProps } from "./type"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import useCustomFetch from "@/hooks/useCustomFetch"
import getMemberId from "@/hooks/getMemberId"
import { useNavigate } from "react-router-dom"
import { durationTime } from "@/styles/config"

const editableProps = {
  width: "320px",
  height: "270px",
  fontSize: "13px",
  whiteSpace: "pre-wrap",
  padding: "10px 10px 10px 10px"
}

const AddPost: React.FC<AddPostProps> = ({ sources, previewImages }) => {
  const toast = useToast()
  const memberId = getMemberId()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [visiblePost, setVisiblePost] = useState<boolean>(true)
  const [planId, setPlanId] = useState<number>(-1)

  async function getMySchedule() {
    try {
      const data = await useCustomFetch(
        `${process.env.REACT_APP_API_URL}/api/my/plans?page=0&size=10&sort=id,desc`,
        {}
      ).then(response => response)
      if (!data.ok) {
        throw new Error("Data Loading Error")
      }
      const jsonData = await data.json()
      return jsonData.data
    } catch (error) {
      alert("잘못된 접근입니다. 메인페이지로 이동합니다.")
      navigate("/")
    }
  }

  async function ReviewPost() {
    try {
      // error handling
      if (title === "") {
        alert("제목을 입력하세요.")
        throw new Error("Empty Title")
      }

      if (content === "") {
        alert("내용을 입력하세요.")
        throw new Error("Empty Content")
      }

      // 이미지 등록 부분
      const imageIds: number[] = []
      for (const item of sources) {
        const formData = new FormData()
        formData.append("image", item)

        await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/images`, {
          method: "POST",
          body: formData
        })
          .then(result => result.json())
          .then(result => {
            imageIds.push(result["imageId"])
          })
      }

      // 일정을 선택했다면 body 바꾸기
      const requestBody =
        planId !== -1
          ? {
              memberId: memberId,
              planId: planId,
              title: title,
              content: content,
              region: "서울",
              visible: visiblePost,
              imageIds: imageIds
            }
          : {
              memberId: memberId,
              title: title,
              content: content,
              region: "서울",
              visible: visiblePost,
              imageIds: imageIds
            }

      // 반환된 imageIds를 이용해 POST
      const response = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error("Review not Registered.")
      }

      toast({
        title: "리뷰가 등록되었습니다.",
        description: "리뷰가 정상적으로 등록되었습니다.",
        status: "success",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })

      navigate("/review_share")
    } catch (error) {
      console.error("Failed to create review", error)
      toast({
        title: "리뷰 생성에 실패했습니다.",
        description: "리뷰 생성에 실패했습니다. 다시 시도해주세요.",
        status: "error",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
    }
  }

  // React-Query
  const queryClient = useQueryClient()

  const bookmarkSchedule = useQuery({ queryKey: ["bookmarkSchedule"], queryFn: getMySchedule })
  const mutation = useMutation({
    mutationFn: ReviewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      setTitle("")
      setContent("")
    }
  })

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      <Box width="320px" margin="0px 10px 0px 0px">
        <ImageSlider images={previewImages} size="sm" />
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
          value={content}
          placeholder="문구를 입력하세요."
          _placeholder={{ color: "green" }}
          border="1px solid lightgray"
          borderRadius="10px"
          selectAllOnFocus={false}
        >
          <EditablePreview {...editableProps} color="gray" overflow={"hidden"} />
          <EditableTextarea
            {...editableProps}
            onChange={e => setContent(e.target.value)}
            resize="none"
            maxLength={300}
          />
        </Editable>
        <Box display="flex" justifyContent="flex-end" marginTop="10px">
          <Box mr="20px">
            <OnOffSwitch onText="공개" offText="" booleanState={visiblePost} setBooleanState={setVisiblePost} />
          </Box>
          {bookmarkSchedule?.data?.content.length !== 0 ? (
            <DropDownRadioBox
              title="내 일정과 연결"
              contents={bookmarkSchedule?.data?.content}
              planId={planId}
              setPlanId={setPlanId}
            />
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          onClick={() => {
            mutation.mutate()
          }}
          backgroundColor="primary"
          color="white"
          height="35px"
          marginTop="10px"
          marginRight="10px"
        >
          POST
        </Button>
      </Box>
    </Box>
  )
}

export default AddPost
