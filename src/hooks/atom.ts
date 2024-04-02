import { atom } from "recoil"
import { SelectedTags, placeObject, scheduleObject } from "../pages/CreateSchedulePage/type"
import { User } from "./type"

//로그인 상태 저장
export const userState = atom<User | null>({
  key: "userState",
  default: null
})

// 일정별 방문 장소에 대한 정보
export const placesByDateState = atom<Record<number, placeObject[]>>({
  key: "placesByDateState",
  default: {}
})

// 선택한 일정을 세부 일정에 표기하기 위한 Date 배열
export const allDates = atom<Date[]>({
  key: "allDates",
  default: []
})

// 현재 검색창에서 선택한 키워드
export const currentKeywords = atom<placeObject[]>({
  key: "currentKeywords",
  default: []
})

// 일정 생성 Post를 위한 State들
export const titleState = atom<string>({
  key: "titleState",
  default: ""
})

export const fromDateState = atom<string>({
  key: "fromDateState",
  default: ""
})

export const toDateState = atom<string>({
  key: "toDateState",
  default: ""
})

export const regionState = atom<string[]>({
  key: "regionState",
  default: []
})

export const visibleState = atom<boolean>({
  key: "visibleState",
  default: true
})

export const copyAllowedState = atom<boolean>({
  key: "copyAllowedState",
  default: true
})

export const scheduleState = atom<scheduleObject[]>({
  key: "scheduleState",
  default: []
})

// 선택된 태그를 관리하는 Recoil atom
export const selectedTagsState = atom<SelectedTags>({
  key: "selectedTagsState",
  default: {}
})
