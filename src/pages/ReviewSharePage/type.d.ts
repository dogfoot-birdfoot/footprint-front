type ReviewType = {
  title: string
  memberId: number
  reviewId: number
  likes: number
  createdAt: string
}

interface getReviewsType {
  page: number
}
