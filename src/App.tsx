import React from "react"
import "./App.css"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "@/pages/MainPage/MainPage"
import LoginPage from "@/pages/LoginPage/LoginPage"
import Layout from "@/components/Layout/Layout"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"
import MyProfile from "@/pages/ProfilePage/MyProfile"
import MySchedule from "@/pages/MySchedulePage/MySchedule"
import MyFavorite from "@/pages/MyFavoritePage/MyFavorite"
import ScheduleSharePage from "./pages/ScheduleSharePage/ScheduleSharePage"
import theme from "@/styles/theme"
import ScheduleDetailPage from "./pages/ScheduleDetailPage/ScheduleDetailPage"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="schedule" element={<MySchedule />} />
            <Route path="favorite" element={<MyFavorite />} />
            <Route path="schedule_share" element={<ScheduleSharePage />} />
            <Route path="schedule_share_detail" element={<ScheduleDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
