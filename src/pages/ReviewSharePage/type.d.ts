type ReviewType = {
  title: string
  memberId: number
  nickname: string
  reviewId: number
  likes: number
  createdAt: string
  previewImageUrl: string
}

interface getReviewsType {
  page: number
}

interface getSchedulesType {
  page: number
}
