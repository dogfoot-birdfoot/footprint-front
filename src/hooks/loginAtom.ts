import { atom } from "recoil"

interface User {
  name: string
  avatar: string
}

export const userState = atom<User | null>({
  key: "userState",
  default: null // 로그인하지 않은 상태
})
