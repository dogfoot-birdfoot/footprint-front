export interface Amounts {
  [key: string]: string
}

export interface bookmarkObject {
  startDate: string
  endDate: string
  planId: number
  planTitle: string
  region: string
}
export interface scheduleObject {
  day: number
  places: placeObject[]
}

export interface placeObject {
  kakaoPlaceId: string
  placeName: string
  longitude: string
  latitude: string
  address: string
  placeDetails: {
    // 옵셔널로 변경
    memo?: string
    cost?: number
    visitTime?: string
  }
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
