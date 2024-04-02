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
      user: UserModel.user,
      schedule: Model

      // 다른 모델들을 여기에 추가
    },

    factories: {
      user: UserFactory.user
      // 다른 팩토리를 여기에 추가
    },

    seeds(server) {
      // 'user' 팩토리를 사용하여 10명의 사용자를 생성합니다.
      server.createList("user", 10)
      const places = [
        {
          kakaoPlaceId: "12345",
          placeName: "경복궁",
          latitude: 37.579617,
          longitude: 126.977041,
          address: "서울특별시 종로구 사직로 161",
          memo: "오후 2시 방문",
          cost: 10000,
          visitTime: "14:00"
        },
        {
          kakaoPlaceId: "67890",
          placeName: "명동",
          latitude: 37.563656,
          longitude: 126.9845,
          address: "서울특별시 중구 명동",
          memo: "쇼핑하기",
          cost: 50000,
          visitTime: "16:00"
        }
      ]

      // totalBudget을 places 배열을 사용하여 다시 계산합니다.
      const totalBudget = places.reduce((accumulator, place) => accumulator + place.cost, 0)

      // 초기 데이터 설정 부분을 수정합니다.
      server.create("schedule", {
        title: "서울 여행",
        region: "서울",
        dates: ["2024-03-28", "2024-03-29"],
        places,
        share: true,
        copy: false,
        totalBudget
      } as any)

      server.create("user", {
        email: "user@example.com",
        password: "password123",
        nickname: "User1",
        profilePicture: "" // 초기에는 프로필 사진이 없음
      } as any)
    },

    routes() {
      this.namespace = "api"

      userRoutes(this)
      authRoutes.call(this)
      // 모든 여행 일정 조회
      this.get("/schedules", schema => {
        return schema.db.schedules
      })

      // 특정 여행 일정 조회
      this.get("/schedules/:id", (schema, request) => {
        const id = request.params.id // URL에서 ID 추출
        return schema.db.schedules.insert(id) // ID에 해당하는 여행 일정을 찾아 반환
      })

      // 여행 일정 생성
      this.post("/schedules", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        return schema.db.schedules.insert(attrs)
      })

      this.logging = true
    }
  })

  return server
}
