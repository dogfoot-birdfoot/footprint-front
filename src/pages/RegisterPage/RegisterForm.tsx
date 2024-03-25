import React, { FC } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginButton, LoginForm, LoginInput } from "@/pages/LoginPage/LoginPage.style"
import { useNavigate } from "react-router-dom"

export interface RegisterFormProps {
  title: string
}

export interface FormValues {
  email: string
  password: string
  confirmPassword: string
  nickname: string // nickname 추가, 필요에 따라 여기에 다른 폼 필드를 추가할 수 있습니다
}

const RegisterForm: FC<RegisterFormProps> = ({ title }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    mode: "onChange"
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormValues> = ({ email, password, nickname }) => {
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nickname })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 409) {
          throw new Error("이메일이 이미 사용 중입니다.")
        } else {
          throw new Error("회원가입에 실패했습니다.")
        }
      })
      .then(user => {
        console.log("Registered with:", user)
        reset() // 폼 초기화
        navigate("/login") // 로그인 페이지로 리다이렉트
      })
      .catch(error => {
        console.error("Registration error:", error.message)
        // 회원가입 실패 처리 (예: 에러 메시지 표시)
      })
  }

  // 비밀번호 필드 값을 실시간으로 관찰
  const passwordValue = watch("password")

  // 필드 유효성 검사 규칙
  const userEmail = { required: "필수 필드입니다." }
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: { value: 6, message: "최소 6자입니다." }
  }
  const userNickname = { required: "필수 필드입니다." }

  // 비밀번호 확인 필드 유효성 검사
  const validatePasswordConfirm = (value: string) => value === passwordValue || "비밀번호가 일치하지 않습니다."

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <LoginInput type="email" placeholder="E-mail" {...register("email", userEmail)} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <LoginInput type="text" placeholder="Nickname" {...register("nickname", userNickname)} />
        {errors.nickname && <p>{errors.nickname.message}</p>}
      </div>
      <div>
        <LoginInput type="password" placeholder="Password" {...register("password", userPassword)} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <LoginInput
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", { validate: validatePasswordConfirm })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <LoginButton type="submit">{title}</LoginButton>
    </LoginForm>
  )
}

export default RegisterForm
