import { Factory, Model, Server } from "miragejs"

// User 모델 정의
export const UserModel = {
  user: Model.extend({
    // 여기에 필요한 모델 속성을 정의할 수 있습니다.
  })
}

// User 팩토리 정의
export const UserFactory = {
  user: Factory.extend({
    email(i: number) {
      return `user${i}@example.com`
    },
    password() {
      // 실제 애플리케이션에서는 비밀번호를 더 안전하게 처리해야 합니다.
      return "password123"
    },
    nickname(i: number) {
      return `nickname${i}`
    }
    // 다른 속성들을 정의할 수 있습니다.
  })
}
