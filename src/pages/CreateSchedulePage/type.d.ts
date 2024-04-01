export interface scheduleObject {
  day: number
  places: placeObject[]
}

export interface placeObject {
  kakaoPlaceId: string
  placeName: string
  latitude: number
  longitude: number
  address: string
  memo: string | undefined
  cost: number | undefined
  visitTime: string | undefined
}

export interface resultObject {
  place_name: string
  x: string
  y: string
}

export interface SearchBoxProps {
  setSelectedPlaces: React.Dispatch<React.SetStateAction<placeObject[]>>
}

export interface AddScheduleProps {
  selectedPlaces: placeObject[] // 각 일자에 확정된 장소
  placesByDate: Record<number, placeObject[]> // 일자별 장소
  setPlacesByDate: React.Dispatch<React.SetStateAction<Record<number, placeObject[]>>>
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
  setSelectedPlaces: React.Dispatch<React.SetStateAction<placeObject[]>>
}

export interface Amounts {
  [key: string]: string
}
