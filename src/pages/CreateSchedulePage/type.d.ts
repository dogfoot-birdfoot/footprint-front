export interface SearchBoxProps {
  setSelectedPlaces: React.Dispatch<React.SetStateAction<string[]>>
  selectedResults: string[]
  setSelectedResults: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AddScheduleProps {
  dates: Date[] // 날짜 배열
  setSelectedResults: React.Dispatch<React.SetStateAction<string[]>>
  selectedPlaces: string[]
  placesByDate: Record<number, string[]>
  setPlacesByDate: React.Dispatch<React.SetStateAction<Record<number, string[]>>>
  showSearchBox: boolean // SearchBox 표시 여부
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>> // SearchBox 표시 여부를 설정하는 함수
  showLoadSchedule: boolean
  setShowLoadSchedule: React.Dispatch<React.SetStateAction<boolean>>
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}
