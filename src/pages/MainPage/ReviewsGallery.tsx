import React from "react"
import {
  DetailInfo,
  ImageTag,
  ImageTag2,
  ReviewBox,
  ReviewImage,
  ReviewItem
} from "@/pages/MainPage/ReviewGallery.style"
import { Box } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

async function getPopularReview() {
  try {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews?sort=like?page=0&size=8`).then(
      response => response
    )
    if (!data.ok) {
      throw new Error("Data Loading Error")
    }
    const jsonData = await data.json()

    return jsonData
  } catch (error) {
    console.log(error)
  }
}

const ReviewsGallery = () => {
  const query = useQuery({ queryKey: ["reviewGallery"], queryFn: getPopularReview })

  return (
    <Box mb={20}>
      <ReviewBox>
        {/* 태그정보, 이미지주소, 상세정보는 추후 데이터에서 받와야함 */}

        {query.data?.content.map((item: ReviewType, index: number) => (
          <Link key={index} to={`/review/${item.reviewId}`}>
            <ReviewItem>
              <ReviewImage
                src={
                  item.previewImageUrl
                    ? item.previewImageUrl
                    : "https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="제주도바다"
              />
              <DetailInfo>
                <Box>{item.title}</Box>
              </DetailInfo>
            </ReviewItem>
          </Link>
        ))}

        {query.data?.content.length < 8 &&
          Array(8 - query.data?.content.length)
            .fill(0)
            .map((item, index) => {
              return (
                <ReviewItem key={index}>
                  <ReviewImage
                    src="https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="제주도바다"
                  />
                  <DetailInfo>
                    <Box>새로운 리뷰를 추가해주세요.</Box>
                  </DetailInfo>
                </ReviewItem>
              )
            })}
      </ReviewBox>
    </Box>
  )
}

export default ReviewsGallery
