import React, { useState } from "react"
import DaySummary from "@/components/DaySummary/DaySummary"
import { TagBox, TagStyle } from "@/components/HorizontalCard/HorizontalCard.style"
import KakaoButton from "@/components/KakaoButton/KakaoButton"
import { Box, Divider, Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react"

import Buttons from "@/components/Buttons/Buttons"
import { CardInfo, UserInfo } from "@/components/HorizontalCard/HorizontalCard"
import { FaRegThumbsUp } from "react-icons/fa"
import { ImageSlider } from "@/components/ImageSlider/ImageSlider"
import { DaySchedule } from "@/pages/MyPage/Schedule/DetailSchedule.style"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const ReviewDetailPage = () => {
  const [modify, setModify] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const navigate = useNavigate()

  // URL을 이용해서 reviewId를 불러옴
  const { id: reviewId } = useParams()

  const destinations = [
    ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
    ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
    ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"]
  ]

  const shareScheduleWithKakao = () => {
    // 여기에 카카오톡 공유 로직을 구현합니다.
    console.log("카카오톡으로 일정 공유하기")
  }

  // 상세 리뷰 페이지 받아오기
  async function getReviewDetail() {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/api/review/${reviewId}`).then(response => response)
      if (!data.ok) {
        throw new Error("Data Loading Error")
      }
      const jsonData = await data.json()

      setTitle(jsonData["title"])
      setContent(jsonData["content"])

      return jsonData
    } catch (error) {
      alert("잘못된 접근입니다. 메인페이지로 이동합니다.")
      navigate("/")
    }
  }

  // 좋아요 기능
  async function likeReview() {
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/add-likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewId: reviewId,
          memberId: 1
        })
      }).then(result => result)

      if (!result.ok) {
        if (result.status === 500) {
          alert("이미 좋아요를 누른 게시글입니다.")
        }
        throw new Error("Like Error")
      }
    } catch (error) {
      console.error("Failed to add likes", error)
    }
  }

  // 리뷰 삭제 기능
  async function deleteCurrentPost() {
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}`, {
        method: "DELETE"
      }).then(result => result)

      if (!result.ok) {
        throw new Error("POST DELETE ERROR")
      } else {
        alert("게시글이 삭제되었습니다.")
      }
    } catch (error) {
      console.error("Failed to delete post", error)
    }
  }

  async function modifyCurrentPost() {
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewId: reviewId,
          memberId: 1,
          title: title,
          content: content,
          imageIds: []
        })
      }).then(result => result)

      console.log(result)

      if (!result.ok) {
        throw new Error("POST MODIFY ERROR")
      } else {
        alert("게시글이 수정되었습니다.")
      }
    } catch (error) {
      console.error("Failed to delete post", error)
    }
  }

  // React-Query
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ["reviewDetail"], queryFn: getReviewDetail })
  const addLike = useMutation({
    mutationFn: likeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewDetail"] })
    }
  })

  const deletePost = useMutation({
    mutationFn: deleteCurrentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewDetail"] })
    }
  })

  const modifyPost = useMutation({
    mutationFn: modifyCurrentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewDetail"] })
    }
  })

  return (
    <>
      <Box ml="80px" mb="40px">
        <Box display="flex">
          <Box display="flex" width="85%" justifyContent="space-between">
            <CardInfo ml_size="50px" scheduleDetails={undefined} />
            <Box ml="20px" mt="30px">
              <Box display="flex" justifyContent="flex-end">
                <Flex height="40px" width="30px" alignItems={"center"}>
                  <Text color="red" fontSize={"20px"} display="inline-block">
                    ♥
                  </Text>
                  <Text display="inline-block">{query?.data?.["likes"]}</Text>
                </Flex>
                <Flex>
                  <IconButton
                    onClick={() => addLike.mutate()}
                    aria-label="favorite"
                    icon={<FaRegThumbsUp />}
                    bg="primary"
                    color="white"
                    borderRadius="20px"
                    mr="10px"
                  />
                  <KakaoButton onClick={shareScheduleWithKakao}>{""}</KakaoButton>
                </Flex>
              </Box>

              <UserInfo createdAtDate={new Date()} />
            </Box>
          </Box>
        </Box>
        <Buttons text="일정 상세보기" size="sm" />
        <DaySchedule>
          {destinations.map((destination, index) => (
            <Box key={index}>
              <DaySummary selectedDay={`Day ${index + 1}`} destinations={destination} size="sm" />
            </Box>
          ))}
        </DaySchedule>

        <Box width="85%" display="flex" justifyContent="flex-end" mt="-10">
          <Box>
            <Flex mt="3">
              {modify && (
                <>
                  <Box ml="2">
                    <Buttons
                      text="수정 완료"
                      onClick={() => {
                        modifyPost.mutate(), setModify(false)
                      }}
                      size="sm"
                    />
                  </Box>
                  <Box ml="2" mr="2">
                    <Buttons text="취소" onClick={() => setModify(false)} size="sm" />
                  </Box>
                </>
              )}
              {!modify && (
                <Box mr="2" ml="2">
                  {" "}
                  <Buttons text="수정" onClick={() => setModify(true)} size="sm" />
                </Box>
              )}
              <Box mr="2">
                <Buttons text="삭제" onClick={() => deletePost.mutate()} size="sm" />
              </Box>
            </Flex>
          </Box>
        </Box>

        <Divider mt="50px" />
        <Box mt="10" display="flex">
          <ImageSlider
            size="lg"
            images={[
              "https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ]}
          />
          <Box width="500px" ml="45px">
            <Text color="gray.500" fontSize="13px" mt="15px">
              2024.03.05
            </Text>
            <Box mt="10px">
              <TagBox>
                <TagStyle>커플여행</TagStyle>
                <TagStyle>관광</TagStyle>
                <TagStyle>휴식</TagStyle>
                <TagStyle>바다여행</TagStyle>
              </TagBox>
            </Box>
            {!modify && (
              <>
                <Heading size="lg" mt="30px">
                  {query?.data?.["title"]}
                </Heading>
                <Text width="500px" mt="20px">
                  {query?.data?.["content"]}
                </Text>
              </>
            )}

            {modify && (
              <>
                <Input
                  mt="10px"
                  placeholder={title}
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  size="lg"
                />
                <Input
                  mt="10px"
                  placeholder={content}
                  value={content}
                  onChange={event => setContent(event.target.value)}
                  size="sm"
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ReviewDetailPage
