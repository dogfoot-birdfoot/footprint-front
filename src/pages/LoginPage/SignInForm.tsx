import { LoginButton, LoginForm, LoginInput } from "@/pages/LoginPage/LoginPage.style"
import React, { FC } from "react"
import KakaoButton from "@/components/KakaoButton/KakaoButton"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useRecoilState } from "recoil"
import { userState } from "@/hooks/atom"

interface SignInFormProps {
  title: string
  getDataForm: (email: string, password: string) => void
}

interface FormValues {
  email: string
  password: string
}
const SignInForm: FC<SignInFormProps> = ({ title }) => {
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed")
        }
        return response.json()
      })
      .then(userData => {
        // 사용자 정보를 Recoil의 userState에 저장
        setUser({
          nickname: userData.nickname, // 응답 구조에 따라 경로 조정 필요
          profilePicture: userData.profilePicture // 응답 구조에 따라 경로 조정 필요
        })
        // localStorage에 사용자 정보 저장
        localStorage.setItem("accessToken", userData["accessToken"])
        localStorage.setItem("refreshToken", userData["refreshToken"])

        navigate("/") // 로그인 성공 후 홈 페이지로 리디렉션
      })
      .catch(error => {
        console.error("Login error:", error)
      })
  }

  const handleKakaoLogin = () => {
    // 카카오톡 로그인 처리 로직
    console.log("카카오톡 로그인 처리")
  }

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <LoginInput
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entered value does not match email format"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <LoginInput
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters"
            }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <LoginButton type="submit">{title}</LoginButton>

      <KakaoButton onClick={() => handleKakaoLogin}>Login for Kakao</KakaoButton>
    </LoginForm>
  )
}

export default SignInForm
