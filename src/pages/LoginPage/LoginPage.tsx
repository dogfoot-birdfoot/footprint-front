import React from "react"
import SignInForm from "@/pages/LoginPage/SignInForm" // SignInForm 컴포넌트의 경로에 맞게 조정해주세요
import {
  FullPageContainer,
  LinkContainer,
  LoginCard,
  LoginContainer,
  LoginStyledLink,
  LoginTitle
} from "@/pages/LoginPage/LoginPage.style"
import { Image } from "@chakra-ui/image"

const LoginPage = () => {
  return (
    <FullPageContainer>
      <LoginContainer>
        <LoginCard>
          <LoginTitle>Welcome!</LoginTitle>
          <SignInForm title="Login" />

          <LinkContainer>
            <LoginStyledLink to="/register">회원가입하기</LoginStyledLink>
          </LinkContainer>
        </LoginCard>
      </LoginContainer>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=1311&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login"
        />
      </div>
    </FullPageContainer>
  )
}

export default LoginPage
