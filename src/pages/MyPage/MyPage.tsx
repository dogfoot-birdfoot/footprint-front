import SideBar from "@/pages/MyPage/SideBar"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { MyPageWrapper } from "@/pages/MyPage/MyPage.style"
import { useQuery } from "@tanstack/react-query"
import useCustomFetch from "@/hooks/useCustomFetch"
import getMemberId from "@/hooks/getMemberId"
import { useState } from "react"
import Loading from "../LoadingPage/Loading"

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const memberId = getMemberId()

  if (memberId === -1) {
    alert("잘못된 접근입니다. 메인페이지로 이동합니다.")
    navigate("/")
  }
  async function getMyReviews() {
    try {
      const data = await useCustomFetch(`${process.env.REACT_APP_API_URL}/api/my/reviews?page=0&size=10`, {}).then(
        response => response
      )
      if (!data.ok) {
        throw new Error("Data Loading Error")
      }
      const jsonData = await data.json()
      setIsLoading(false)
      return jsonData
    } catch (error) {
      alert("잘못된 접근입니다. 메인페이지로 이동합니다.")
      navigate("/")
      setIsLoading(false)
    }
  }

  async function getMyLikeReviews() {
    try {
      const data = await useCustomFetch(
        `${process.env.REACT_APP_API_URL}/api/my/liked-reviews?page=0&size=10`,
        {}
      ).then(response => response)

      if (!data.ok) {
        throw new Error("Data Loading Error")
      }
      const jsonData = await data.json()

      return jsonData
    } catch (error) {
      alert("잘못된 접근입니다. 메인페이지로 이동합니다.")
      navigate("/")
    }
  }

  const myReview = useQuery({ queryKey: ["myReviews"], queryFn: getMyReviews })
  const myLikeReviews = useQuery({ queryKey: ["myLikeReviews"], queryFn: getMyLikeReviews })

  if (isLoading) {
    return <Loading />
  }
  return (
    <MyPageWrapper>
      <SideBar />
      <Outlet />
    </MyPageWrapper>
  )
}

export default MyPage
