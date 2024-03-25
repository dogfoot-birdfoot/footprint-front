import { LoginButton, LoginForm, LoginInput } from "@/pages/LoginPage/LoginPage.style"
import React, { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import KakaoButton from "@/components/KakaoButton/KakaoButton"
import { useSetRecoilState } from "recoil"
import { userState } from "@/hooks/loginAtom"
import { useNavigate } from "react-router-dom"

export interface SignInFormProps {
  title: string
  getDataForm: (email: string, password: string) => void
}

export interface FormValues {
  email: string
  password: string
}

const SignInForm: FC<SignInFormProps> = ({ title }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({ mode: "onChange" })
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    // Mirage 서버에 로그인 요청을 보냅니다.
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed")
        }
        return response.json()
      })
      .then(userData => {
        setUser({
          name: userData.user.name || "user",
          avatar: userData.user.avatar || "기본 아바타 URL"
        })
        reset()
        navigate("/")
      })
      .catch(error => {
        console.error("Login error:", error)
        // 로그인 실패 처리 (예: 에러 메시지 표시)
      })
  }

  // 폼 필드 유효성 검사 규칙
  const userEmail = { required: "필수 필드입니다." }
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: { value: 6, message: "최소 6자입니다." }
  }

  const handleKakaoLogin = () => {
    // 카카오톡 로그인 처리 로직
    console.log("카카오톡 로그인 처리")
  }

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <LoginInput type="email" placeholder="E-mail" {...register("email", userEmail)} />
      </div>
      <div>
        <LoginInput type="password" placeholder="Password" {...register("password", userPassword)} />
      </div>
      <LoginButton type="submit">{title}</LoginButton>

      <KakaoButton onClick={handleKakaoLogin}>Login for Kakao</KakaoButton>
    </LoginForm>
  )
}

export default SignInForm
