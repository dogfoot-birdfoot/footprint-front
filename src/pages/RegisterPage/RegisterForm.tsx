import React, { FC } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorBox, LoginButton, LoginForm, LoginInput } from "@/pages/LoginPage/LoginPage.style"
import { useNavigate } from "react-router-dom"
import { error } from "console"
import { useToast } from "@chakra-ui/react"

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
  const toast = useToast()

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password, nickname }) => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, nickname })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 401) {
          alert("중복된 이메일, 닉네임이 포함되어 있습니다.")
          throw new Error("Register Error")
        } else {
          throw new Error("회원가입에 실패했습니다.")
        }
      })

      // 성공 시 토스트 띄우기
      .then(user => {
        console.log("Registered successfully:", user)
        toast({
          title: "회원가입에 성공했습니다.",
          description: "회원가입을 정상적으로 성공했습니다.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top"
        })
        reset() // 폼 초기화
        navigate("/login") // 로그인 페이지로 리다이렉트
      })
      .catch(error => {
        console.error("Registration error:", error.message)
        // 회원가입 실패 처리 (예: 에러 메시지 표시)
      })
  }

  // 비밀번호 필드 값을 실시간으로 관찰
  const regExpEmail = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/
  const passwordValue = watch("password")

  // 필드 유효성 검사 규칙
  const userEmail = {
    required: "필수 필드입니다.",
    pattern: { value: regExpEmail, message: "이메일 형식이 맞지 않습니다." }
  }
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
        {errors.email && <ErrorBox>{errors.email.message}</ErrorBox>}
      </div>
      <div>
        <LoginInput type="text" placeholder="Nickname" {...register("nickname", userNickname)} />
        {errors.nickname && <ErrorBox>{errors.nickname.message}</ErrorBox>}
      </div>
      <div>
        <LoginInput type="password" placeholder="Password" {...register("password", userPassword)} />
        {errors.password && <ErrorBox>{errors.password.message}</ErrorBox>}
      </div>

      <div>
        <LoginInput
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: validatePasswordConfirm,
            required: "필수 필드입니다.",
            minLength: { value: 6, message: "최소 6자입니다." }
          })}
        />
        {errors.confirmPassword && <ErrorBox>{errors.confirmPassword.message}</ErrorBox>}
      </div>
      <LoginButton type="submit">{title}</LoginButton>
    </LoginForm>
  )
}

export default RegisterForm
