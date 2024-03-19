export interface SearchBoxProps {
  setSelectedPlaces: React.Dispatch<React.SetStateAction<string[]>>
  selectedResults: string[]
  setSelectedResults: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AddScheduleProps {
  dates: Date[] // 날짜 배열
  setSelectedResults: React.Dispatch<React.SetStateAction<string[]>> // 체크박스로 업데이트 되는 배열
  selectedPlaces: string[] // 각 일자에 확정된 장소
  placesByDate: Record<number, string[]> // 일자별 장소
  setPlacesByDate: React.Dispatch<React.SetStateAction<Record<number, string[]>>>
  showSearchBox: boolean // SearchBox 표시 여부
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>>
  showLoadSchedule: boolean // 일정 불러오기 클릭 여부 확인
  setShowLoadSchedule: React.Dispatch<React.SetStateAction<boolean>>
  activeIndex: number // 현재 활성화된 날짜의 index
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface LoadScheduleProps {
  activeIndex: number
  setSelectedPlaces: React.Dispatch<React.SetStateAction<string[]>>
}
