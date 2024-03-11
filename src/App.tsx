import React from "react"
import "./App.css"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "@/pages/MainPage/MainPage"
import LoginPage from "@/pages/LoginPage/LoginPage"
import Layout from "@/components/layout/Layout"

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
