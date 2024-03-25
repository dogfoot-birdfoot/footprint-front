import { Response } from "miragejs"

interface UserAttrs {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: any
}

//schema와 request 매개변수는 Mirage JS의 내부 구현에 따라 달라질 수 있으므로,
//이들의 타입을 정확히 지정하기는 어려워서 임시로 여기서는 any 타입을 사용

export default function authRoutes(this: any): void {
  this.post("/login", (schema: any, request: any) => {
    const attrs: UserAttrs = JSON.parse(request.requestBody)
    const user = schema.users.findBy({ email: attrs.email })

    if (user && user.password === attrs.password) {
      const response: LoginResponse = { token: "fake-jwt-token", user: user.attrs }
      return response
    } else {
      return new Response(401, {}, { errors: ["Email or password is wrong"] })
    }
  })

  // 여기에 더 많은 인증 관련 라우트를 추가할 수 있습니다.
}
