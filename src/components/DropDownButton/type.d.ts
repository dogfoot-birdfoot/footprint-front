import { TravelPlan } from "@/pages/ScheduleSharePage/type"

export interface DropDownButtonProps {
  title: string
  contents: string[][]
}

export interface DropDownCheckBoxProps {
  title: string
  contents: string[]
}

export interface DropDownRadioBoxProps {
  title: string
  contents: TravelPlan[]
  planId: number
  setPlanId: React.Dispatch<React.SetStateAction<number>>
}
