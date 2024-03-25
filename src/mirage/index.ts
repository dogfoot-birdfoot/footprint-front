import { createServer, Model, Factory, RestSerializer } from "miragejs"
import { userRoutes } from "./routes/userRoutes"
import { UserFactory, UserModel } from "./models/user"
import userSerializer from "./serializer/user"
import authRoutes from "./routes/authRoutes"

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    serializers: {
      application: RestSerializer, //전역 시리얼라이저 설정 (지금은 없음)
      user: userSerializer
    },
    environment,

    models: {
      user: UserModel.user
      // 다른 모델들을 여기에 추가
    },

    factories: {
      user: UserFactory.user
      // 다른 팩토리를 여기에 추가
    },

    seeds(server) {
      // 'user' 팩토리를 사용하여 10명의 사용자를 생성합니다.
      server.createList("user", 10)
    },

    routes() {
      this.namespace = "api"

      userRoutes(this)
      authRoutes.call(this)

      this.logging = true
    }
  })

  return server
}
