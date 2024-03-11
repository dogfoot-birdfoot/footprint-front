import React from "react"
import {
  FullPageContainer,
  LinkContainer,
  LoginCard,
  LoginContainer,
  LoginStyledLink,
  LoginTitle
} from "@/styles/LoginPageStyle"
import { Image } from "@chakra-ui/image"
import RegisterForm from "./RegisterForm"

const RegisterPage = () => {
  return (
    <FullPageContainer>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=1311&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login"
        />
      </div>
      <LoginContainer>
        <LoginCard>
          <LoginTitle>Join us!</LoginTitle>
          <RegisterForm title="Register" getDataForm={(email, password) => console.log(email, password)} />
          <LinkContainer>
            <LoginStyledLink to="/login">로그인하기</LoginStyledLink>
          </LinkContainer>
        </LoginCard>
      </LoginContainer>
    </FullPageContainer>
  )
}

export default RegisterPage
