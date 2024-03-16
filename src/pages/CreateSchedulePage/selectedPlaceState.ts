import { atom } from "recoil"

// 선택된 장소들을 저장할 리코일 상태
export const selectedPlacesState = atom<string[]>({
  key: "selectedPlacesState", // 고유한 상태의 키
  default: [] // 초기 상태 값
})
