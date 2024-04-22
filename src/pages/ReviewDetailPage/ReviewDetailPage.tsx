import React, { useState } from "react"
import DaySummary from "@/components/DaySummary/DaySummary"
import KakaoButton from "@/components/KakaoButton/KakaoButton"
import { Box, Button, Divider, Flex, Heading, IconButton, Input, Text, Textarea, useToast } from "@chakra-ui/react"

import Buttons from "@/components/Buttons/Buttons"
import { CardInfo, UserInfo } from "@/components/HorizontalCard/HorizontalCard"
import { FaRegThumbsUp } from "react-icons/fa"
import { ImageSlider } from "@/components/ImageSlider/ImageSlider"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useCustomFetch from "@/hooks/useCustomFetch"
import OnOffSwitch from "@/components/switch/OnOffSwitch"
import { ScheduleDetails } from "@/components/HorizontalCard/type"
import getMemberId from "@/hooks/getMemberId"
import Loading from "../LoadingPage/Loading"
import { durationTime } from "@/styles/config"

const ReviewDetailPage = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [modify, setModify] = useState<boolean>(false)
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetails | undefined>(undefined)
  const navigate = useNavigate()

  // URL, token을 이용해서 reviewId를 불러옴
  const { id: reviewStringId } = useParams()
  const reviewId = Number(reviewStringId)
  const memberId = getMemberId()

  const shareScheduleWithKakao = () => {
    // 여기에 카카오톡 공유 로직을 구현합니다.
    console.log("카카오톡으로 일정 공유하기")
  }

  // 상세 리뷰 페이지 받아오기
  async function getReviewDetail() {
    try {
      // 비회원이라면, login 화면으로 redirect
      if (memberId === -1) {
        navigate("/login")
        return
      }
      const data = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/review/${reviewId}`, {}).then(
        response => response
      )
      if (!data.ok) {
        throw new Error("Data Loading Error")
      }

      const jsonData = await data.json()

      // planId가 null이 아니라면 불러오기
      if (jsonData["planId"]) {
        const schedule = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/plans/${jsonData["planId"]}`, {})
        if (!schedule.ok) {
          throw new Error("Schedule Data Loading Error")
        }
        const scheduleJsonData = await schedule.json()

        setScheduleDetail(scheduleJsonData?.data)
      }

      setTitle(jsonData["title"])
      setContent(jsonData["content"])
      setVisibleProfile(jsonData["visible"])
      setIsLoading(false)

      return jsonData
    } catch (error) {
      navigate("/")
    }
  }

  // 좋아요 기능
  async function likeReview() {
    try {
      const result = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/reviews/add-likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewId: reviewId,
          memberId: memberId
        })
      }).then(result => result)

      if (!result.ok) {
        if (result.status === 500) {
          toast({
            title: "좋아요를 누를 수 없습니다.",
            description: "이미 좋아요를 누른 게시글입니다.",
            status: "error",
            duration: durationTime,
            isClosable: true,
            position: "top"
          })
        }
        throw new Error("Like Error")
      } else {
        toast({
          title: "좋아요를 눌렀습니다.",
          description: "해당 게시글에 좋아요를 눌렀습니다.",
          status: "success",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
      }
    } catch (error) {
      console.error("Failed to add likes", error)
    }
  }

  // 리뷰 삭제 기능
  async function deleteCurrentPost() {
    try {
      if (query.data.memberId !== memberId) {
        throw new Error("MemberId is not consistent")
      }
      const result = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/reviews/${reviewId}`, {
        method: "DELETE"
      }).then(result => result)

      if (!result.ok) {
        throw new Error("POST DELETE ERROR")
      } else {
        navigate("/schedule_share")
        toast({
          title: "리뷰 삭제",
          description: "리뷰가 삭제되었습니다.",
          status: "success",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
      }
    } catch (error) {
      console.error("Failed to delete post", error)
    }
  }

  // 리뷰 수정 기능
  async function modifyCurrentPost() {
    try {
      // 작성자와 현재 로그인한 멤버가 다르다면, 오류 발생시키기
      if (query.data.memberId !== memberId) {
        throw new Error("MemberId is not consistent")
      }

      const result = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewId: reviewId,
          memberId: memberId,
          title: title,
          content: content,
          region: "부산",
          visible: visibleProfile,
          imageIds: query?.data?.imageIds ? query.data.imageIds : []
        })
      }).then(result => result)

      if (!result.ok) {
        throw new Error("POST MODIFY ERROR")
      } else {
        toast({
          title: "게시글이 수정되었습니다.",
          description: "성공적으로 게시글이 수정되었습니다.",
          status: "success",
          duration: durationTime,
          isClosable: true,
          position: "top"
        })
      }
    } catch (error) {
      console.error("Failed to modify post", error)
      toast({
        title: "게시글 수정에 실패했습니다.",
        description: "다시 시도해주세요.",
        status: "error",
        duration: durationTime,
        isClosable: true,
        position: "top"
      })
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

  if (query?.data === undefined) {
    return <Loading />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Box ml="80px" mb="40px">
        <Box display="flex">
          <Box display="flex" width="85%" justifyContent="space-between">
            {query?.data?.planId ? <CardInfo ml_size="20px" scheduleDetails={scheduleDetail} /> : <Box></Box>}
            <Box ml="20px" mt="30px">
              <Box display="flex" justifyContent="flex-end">
                <Flex userSelect="none" mr="5px" height="40px" width="30px" alignItems={"center"}>
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

              <UserInfo nickname={query?.data?.nickname} createdAtDate={new Date(query?.data?.createdAt)} />
            </Box>
          </Box>
        </Box>

        {query?.data?.planId && (
          <Flex
            padding="20px 10px 20px 20px"
            border="1px dashed lightgray"
            borderRadius="10px"
            width="600px"
            direction="column"
            justifyContent={"right"}
          >
            {scheduleDetail?.schedules.map((schedule, idx) => (
              <Box width="550px" key={idx}>
                <DaySummary
                  selectedDay={`Day ${idx + 1}`}
                  destinations={schedule["places"].map(place => place["placeName"])}
                  size="lg"
                />
              </Box>
            ))}
            <Link
              style={{ display: "flex", width: "550px", justifyContent: "right", marginRight: "20px" }}
              to={`/schedule_share_detail/${query.data.planId}`}
            >
              <Button backgroundColor="primary" color="white" mt="50px" size="sm" borderRadius="10px">
                일정 상세보기
              </Button>
            </Link>
          </Flex>
        )}

        {query.data?.memberId === memberId && (
          <Box width="85%" display="flex" justifyContent="flex-end" mt="10">
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
        )}

        <Divider mt="50px" />
        <Box mt="10" display="flex">
          <ImageSlider size="lg" images={query.data?.images} />
          <Box width="500px" ml="45px">
            <Flex justifyContent={"space-between"}>
              <Text color="gray.500" fontSize="13px" mt="15px">
                2024.03.05
              </Text>
              {modify && (
                <OnOffSwitch
                  onText="공개"
                  offText="비공개"
                  booleanState={visibleProfile}
                  setBooleanState={setVisibleProfile}
                />
              )}
            </Flex>
            <Box mt="10px"></Box>
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
                <Textarea
                  resize="none"
                  mt="10px"
                  height="290px"
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
