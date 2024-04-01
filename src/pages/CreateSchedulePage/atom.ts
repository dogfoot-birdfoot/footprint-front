import { atom } from "recoil"
import { scheduleObject } from "./type"

export const titleState = atom<string>({
  key: "titleState",
  default: ""
})

export const fromDateState = atom<string>({
  key: "fromDateState",
  default: ""
})

export const toDateState = atom<string>({
  key: "toDateState",
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
