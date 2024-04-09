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
        id(i) {
          return `${i}` // 각 유저마다 고유한 id를 설정합니다.
        },
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
        startDate: "2024-03-28",
        endDate: "2024-03-29",
        places,
        visible: true,
        copyAllowed: false,
        tags: ["가족여행", "관광"],
        schedules: [
          {
            day: 1,
            places: [
              {
                placeName: "경복궁",
                placeDetails: [{ memo: "오후 2시 방문", cost: 10000, visitTime: "14:00" }]
              },
              // 여기에 새로운 여행지를 추가
              {
                placeName: "남산타워",
                placeDetails: [{ memo: "저녁에 방문하여 야경 감상", cost: 15000, visitTime: "15:00" }]
              }
            ]
          },
          {
            day: 2,
            places: [
              {
                placeName: "명동",
                placeDetails: [{ memo: "쇼핑하기", cost: 50000, visitTime: "14:00" }]
              },
              { placeName: "신세계백화점", placeDetails: [{ memo: "쇼핑하기", cost: 600000, visitTime: "15:00" }] }
            ]
          },
          {
            day: 3,
            places: [
              {
                placeName: "종로",
                placeDetails: [{ memo: "광장시장", cost: 50000, visitTime: "14:00" }]
              },
              { placeName: "을지로", placeDetails: [{ memo: "쇼핑이랑 맛집", cost: 60000, visitTime: "15:00" }] },
              { placeName: "청계천", placeDetails: [{ memo: "산책", cost: 0, visitTime: "20:00" }] },
              { placeName: "동대문", placeDetails: [{ memo: "쇼핑", cost: 100000, visitTime: "22:00" }] }
            ]
          }
        ],
        totalBudget,
        likeCount: 10,
        bookMarkCount: 5
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
