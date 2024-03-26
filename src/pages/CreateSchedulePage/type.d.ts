export interface resultObject {
  place_name: string
  x: string
  y: string
}

export interface SearchBoxProps {
  setSelectedPlaces: React.Dispatch<React.SetStateAction<resultObject[]>>
  selectedResults: resultObject[]
  setSelectedResults: React.Dispatch<React.SetStateAction<resultObject[]>>
}

export interface AddScheduleProps {
  dates: Date[] // 날짜 배열
  setSelectedResults: React.Dispatch<React.SetStateAction<resultObject[]>> // 체크박스로 업데이트 되는 배열
  selectedPlaces: resultObject[] // 각 일자에 확정된 장소
  placesByDate: Record<number, resultObject[]> // 일자별 장소
  setPlacesByDate: React.Dispatch<React.SetStateAction<Record<number, resultObject[]>>>
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
  setSelectedPlaces: React.Dispatch<React.SetStateAction<resultObject[]>>
}

export interface Amounts {
  [key: string]: string
}
