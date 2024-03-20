import { LoginButton, LoginForm, LoginInput } from "@/pages/LoginPage/LoginPage.style"
import React, { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import KakaoButton from "@/components/KakaoButton/KakaoButton"
import { useSetRecoilState } from "recoil"
import { userState } from "@/hooks/loginAtom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export interface SignInFormProps {
  title: string
  getDataForm: (email: string, password: string) => void
}

export interface FormValues {
  email: string
  password: string
}

const SignInForm: FC<SignInFormProps> = ({ title, getDataForm }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({ mode: "onChange" })
  const setUser = useSetRecoilState(userState)
  const auth = getAuth()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userData = {
          name: userCredential.user.displayName || "익명 사용자", // displayName이 없으면 "익명 사용자"를 기본값으로 사용
          avatar: userCredential.user.photoURL || "기본 아바타 URL" // photoURL이 없으면 기본 아바타 URL을 사용
        }
        setUser(userData) // Recoil 상태 업데이트
        reset()
        navigate("/")
      })
      .catch(error => {
        console.error("Login error:", error)
        // 로그인 실패 처리 (예: 에러 메시지 표시)
      })
  }

  const userEmail = {
    required: "필수 필드입니다."
  }

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다."
    }
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
