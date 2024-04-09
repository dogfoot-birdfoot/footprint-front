import { createServer, Model, Factory, RestSerializer } from "miragejs"
import { addDays, format } from "date-fns"

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    serializers: {
      application: RestSerializer
    },
    environment,

    models: {
      schedule: Model,
      user: Model,
      review: Model

      // 다른 모델들을 여기에 추가
    },

    factories: {
      schedule: Factory.extend({
        title(i) {
          return `서울 여행 #${i}`
        },
        region() {
          return "서울"
        },
        startDate() {
          const today = new Date()
          return format(today, "yyyy-MM-dd")
        },
        endDate() {
          const today = new Date()
          const endDate = addDays(today, 3) // 시작 날짜로부터 3일 후
          return format(endDate, "yyyy-MM-dd")
        },
        visible() {
          return true
        },
        copyAllowed() {
          return false
        },
        tags() {
          return ["가족여행", "관광"]
        },
        schedules(i) {
          // 간단한 예시로, 여행 일정을 생성합니다. 실제 애플리케이션에서는 더 복잡한 로직이 필요할 수 있습니다.
          return [
            {
              day: 1,
              places: [
                {
                  placeName: `장소 ${i}-1`,
                  placeDetails: [{ memo: "방문 메모", cost: 1000 * i, visitTime: "10:00" }]
                }
              ]
            }
          ]
        },
        totalBudget(i) {
          // 예시로, 비용은 장소 수와 i 값에 따라 달라집니다.
          return 1000 * i
        },
        likeCount() {
          return Math.floor(Math.random() * 100)
        },
        bookMarkCount() {
          return Math.floor(Math.random() * 50)
        },
        createdAt() {
          return new Date().toISOString()
        }
      }),
      user: Factory.extend({
        id(i) {
          return `${i}`
        },
        email(i) {
          return `user${i}@example.com`
        },
        password: "password123",
        nickname(i) {
          return `User${i}`
        },
        profilePicture: ""
      })
    },
    seeds(server) {
      server.createList("schedule", 10) // 10개의 여행 일정 데이터를 생성합니다.
      server.createList("user", 10)
    },
    routes() {
      this.namespace = "api"

      //모든 여행 일정 조회
      this.get("/schedules", schema => {
        return schema.db.schedules
      })

      // 게시된 여행 일정 조회
      this.get("/schedules/get", schema => {
        return schema.db.schedules // 모든 여행 일정 반환
      })

      // 특정 여행 일정 조회
      this.get("/schedules/:id", (schema, request) => {
        const id = request.params.id // URL에서 ID 추출
        return schema.db.schedules.find(id) // ID에 해당하는 여행 일정을 찾아 반환
      })

      // 여행 일정 생성
      this.post("/schedules/create", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        // 현재 날짜와 시간을 'createdAt' 필드로 설정
        attrs.createdAt = new Date().toISOString()
        const newSchedule = schema.db.schedules.insert(attrs)
        return newSchedule.attrs
      })

      // 리뷰 생성
      this.post("/reviews", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const newReview = schema.db.reviews.insert(attrs)
        return newReview.attrs
      })

      // 게시된 리뷰 조회
      this.get("/reviews", schema => {
        return schema.db.reviews // 모든 여행 일정 반환
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

      // 사용자 조회
      this.get("/users/:id", (schema, request) => {
        const id = request.params.id // URL에서 ID 추출
        return schema.db.users.find(id) // ID에 해당하는 사용자 정보 반환
      })

      this.logging = true
    }
  })

  return server
}
