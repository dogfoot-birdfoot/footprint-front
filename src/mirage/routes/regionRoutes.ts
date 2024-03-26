import { Request, Response } from "miragejs" // Mirage JS 타입 임포트

// 함수 타입 정의: Mirage의 서버 메서드를 확장하는 함수
export default function (this: any): void {
  this.post("/regions/selection", (schema: any, request: Request) => {
    // 요청 본문 파싱
    const { regionName, isSelected } = JSON.parse(request.requestBody) as { regionName: string; isSelected: boolean }

    // 선택된 지역을 찾거나 새로 생성
    const region = schema.regions.findBy({ name: regionName }) || schema.regions.create({ name: regionName })

    // 선택 상태 업데이트
    region.update({ isSelected })

    // 업데이트된 지역 정보 반환
    return region.attrs as Response
  })
}
