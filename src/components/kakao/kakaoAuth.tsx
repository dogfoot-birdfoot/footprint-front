import React, { useEffect } from "react"
import styled from "styled-components"

const KakaoAuth = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    const kakaoLogin = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/kakao/callback?code=${code}`)
        .then(res => res.json())
        .then(userData => {
          localStorage.setItem("accessToken", userData["accessToken"])
          localStorage.setItem("refreshToken", userData["refreshToken"])
          localStorage.setItem("nickname", userData["nickname"])
          window.location.href = "/"
        })
    }
    kakaoLogin()
  }, [])

  return (
    <>
      <Container></Container>
    </>
  )
}

export default KakaoAuth

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
