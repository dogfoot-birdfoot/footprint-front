export interface CreateScheduleFormProps {
  selectedPlaces: string[]
  setSelectedPlaces: React.Dispatch<React.SetStateAction<string[]>>
  showSearchBox: boolean // 부모 컴포넌트로부터 전달받을 새로운 prop
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>> // 부모 컴포넌트로부터 전달받을 새로운 prop
}

export interface SearchBoxProps {
  setSelectedPlaces: React.Dispatch<React.SetStateAction<string[]>>
}
