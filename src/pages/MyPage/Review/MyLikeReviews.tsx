import ReviewCardItem from "@/components/Card/ReviewCardItem"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Favorite, FavoriteList, FavoriteTitle } from "./MyReview.style"
import Loading from "@/pages/LoadingPage/Loading"
import { BsHeartFill } from "react-icons/bs"
import { Box, Text } from "@chakra-ui/react"

const MyLikeReviews = () => {
  const { data: myLikeReviews } = useQuery<any>({ queryKey: ["myLikeReviews"] })

  if (myLikeReviews === undefined) {
    return (
      <Favorite>
        <Loading />
      </Favorite>
    )
  }

  return (
    <Favorite>
      <FavoriteTitle>
        <BsHeartFill size="1rem" />
        <Text fontSize={"14px"} ml="5px">
          좋아요한 리뷰 목록
        </Text>
      </FavoriteTitle>
      {myLikeReviews?.content.length !== 0 ? (
        <FavoriteList>
          {myLikeReviews?.content.map((item: ReviewType, itemIndex: number) => {
            return (
              <Link key={itemIndex} to={`/review/${item.reviewId}`}>
                <ReviewCardItem
                  title={item.title}
                  memberId={item.memberId}
                  likes={item.likes}
                  createdAt={new Date(item.createdAt)}
                  previewImage={item.previewImageUrl}
                />
              </Link>
            )
          })}
        </FavoriteList>
      ) : (
        <Box mt="30px" width="90%">
          좋아요한 리뷰가 없습니다.
        </Box>
      )}
    </Favorite>
  )
}

export default MyLikeReviews
