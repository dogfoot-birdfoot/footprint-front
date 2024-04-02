import { createServer, Model, Factory, RestSerializer } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    serializers: {
      application: RestSerializer //전역 시리얼라이저 설정 (지금은 없음)
    },
    environment,

    models: {
      schedule: Model,
      user: Model

      // 다른 모델들을 여기에 추가
    },

    factories: {
      user: Factory.extend({
        email(i) {
          return `user${i}@example.com` // 동적 이메일 생성
        },
        password: "password123", // 기본 비밀번호
        nickname(i) {
          return `User${i}` // 동적 닉네임 생성
        },
        profilePicture: "" // 초기 프로필 사진은 비어있음
      })
    },

    seeds(server) {
      // 'user' 팩토리를 사용하여 10명의 사용자를 생성합니다.
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

      server.createList("user", 10)
      server.create("user", {
        email: "user@example.com",
        password: "password123",
        nickname: "User1",
        profilePicture: "" // 초기에는 프로필 사진이 없음
      } as any)
    },

    routes() {
      this.namespace = "api"

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

      // 회원가입
      this.post("/users/register", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const existingUser = schema.db.users.findBy({ email: attrs.email })
        if (existingUser) {
          throw new Error("User already exists with that email")
        }
        const user = schema.db.users.insert(attrs)
        return user.attrs
      })

      // 로그인
      this.post("/users/login", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const user = schema.db.users.findBy({ email: attrs.email })
        if (!user || user.password !== attrs.password) {
          throw new Error("Invalid login credentials")
        }
        return { user: user.attrs, token: "fake-jwt-token" } // 로그인 성공 시, 사용자 정보와 함께 가짜 토큰 반환
      })
      this.logging = true
    }
  })

  return server
}
