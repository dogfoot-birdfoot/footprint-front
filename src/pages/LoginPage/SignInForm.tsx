import { LoginButton, LoginForm, LoginInput } from "@/styles/LoginPageStyle"
import React, { FC } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const SignInForm: FC<{ title: string; getDataForm: (email: string, password: string) => void }> = ({
  title,
  getDataForm
}) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    mode: "onChange"
  })

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    getDataForm(email, password)
    reset()
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

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <LoginInput type="email" placeholder="E-mail" {...register("email", userEmail)} />
      </div>
      <div>
        <LoginInput type="password" placeholder="Password" {...register("password", userPassword)} />
      </div>
      <LoginButton type="submit">{title}</LoginButton>
    </LoginForm>
  )
}

export default SignInForm
