import { Response, Request, Server } from "miragejs"

// Mirage 서버의 컨텍스트에서 사용할 수 있는 타입을 'this' 매개 변수에 명시합니다.
// 이 경우, 'Server' 타입을 사용합니다.
export default function (this: Server) {
  this.post("/dates/selection", (schema, request: Request) => {
    // 'Request' 타입은 Mirage JS에서 HTTP 요청 객체를 나타냅니다.
    const { startDate, endDate } = JSON.parse(request.requestBody) as { startDate: string; endDate: string }

    // 여기서 startDate와 endDate를 처리하는 로직 구현
    // 예: 선택된 날짜 범위를 데이터베이스에 저장하거나, 필요한 처리 수행

    // 'Response' 타입을 사용하여 응답 객체를 생성합니다.
    return new Response(200, {}, { startDate, endDate })
  })
}
