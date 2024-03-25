import React from "react"
import { RecoilRoot } from "recoil"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// CSS
import "./App.css"
import theme from "@/styles/theme"

// 기본 페이지
import MainPage from "@/pages/MainPage/MainPage"
import LoginPage from "@/pages/LoginPage/LoginPage"
import Layout from "@/components/Layout/Layout"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"
import ScheduleSharePage from "@/pages/ScheduleSharePage/ScheduleSharePage"
import ScheduleDetailPage from "@/pages/ScheduleDetailPage/ScheduleDetailPage"
import ReviewSharePage from "@/pages/ReviewSharePage/ReviewSharePage"
import ReviewDetailPage from "@/pages/ReviewDetailPage/ReviewDetailPage"
import SearchResultsPage from "@/pages/SearchResultPage/SearchResultPage"
import AddReviewPage from "@/pages/AddReviewPage/AddReviewPage"
import CreateSchedulePage from "@/pages/CreateSchedulePage/CreateSchedulePage"

// 마이페이지
import MyPage from "@/pages/MyPage/MyPage"
import MyProfile from "@/pages/MyPage/Profile/MyProfile"
import MySchedule from "@/pages/MyPage/Schedule/MySchedule"
import MyFavorite from "@/pages/MyPage/Favorite/MyFavorite"

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="schedule_share" element={<ScheduleSharePage />} />
              <Route path="review_share" element={<ReviewSharePage />} />
              <Route path="schedule_share_detail" element={<ScheduleDetailPage />} />
              <Route path="review_share_detail" element={<ReviewDetailPage />} />
              <Route path="search" element={<SearchResultsPage />} />
              <Route path="addreview" element={<AddReviewPage initialStep={1} />} />
              <Route path="create_schedule" element={<CreateSchedulePage />} />
              <Route path="mypage" element={<MyPage />}>
                <Route path="profile" element={<MyProfile />} />
                <Route path="schedule" element={<MySchedule />} />
                <Route path="favorite" element={<MyFavorite />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
