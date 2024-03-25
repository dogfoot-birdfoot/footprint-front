import { Server, Request, Registry } from "miragejs"
import { AnyFactories, AnyModels } from "miragejs/-types"

// 사용자 정의 모델 타입을 여기에 정의할 수 있습니다.
type AppRegistry = Registry<AnyModels, AnyFactories>

export const userRoutes = (server: Server<AppRegistry>) => {
  server.get("/users", (schema, request: Request) => {
    return schema.all("user")
  })

  // 여기에 더 많은 사용자 관련 라우트를 추가할 수 있습니다.
}
