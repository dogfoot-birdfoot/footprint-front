export interface Amounts {
  [key: string]: string
}

export interface scheduleObject {
  day: number
  places: placeObject[]
}

export interface placeObject {
  placeDetails: any
  kakaoPlaceId: string
  placeName: string
  latitude: number
  longitude: number
  address: string
  memo: string | undefined
  cost: number | undefined
  visitTime: string | undefined
}

// Props

export interface AddScheduleProps {
  showSearchBox: boolean // SearchBox 표시 여부
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>>
  showLoadSchedule: boolean // 일정 불러오기 클릭 여부 확인
  setShowLoadSchedule: React.Dispatch<React.SetStateAction<boolean>>
  activeIndex: number // 현재 활성화된 날짜의 index
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  numberOfForms: number // numberOfForms를 prop으로 받음
}

export interface LoadScheduleProps {
  activeIndex: number
}

export interface SearchBoxProps {
  activeIndex: number
}

// 선택된 태그를 관리하는 상태의 타입 정의
export interface SelectedTags {
  [key: string]: boolean
}
