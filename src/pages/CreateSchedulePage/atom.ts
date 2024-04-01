import { atom } from "recoil"
import { scheduleObject } from "./type"

export const titleState = atom<string>({
  key: "titleState",
  default: ""
})

export const startDateState = atom<string>({
  key: "startDateState",
  default: ""
})

export const endDateState = atom<string>({
  key: "endDateState",
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
