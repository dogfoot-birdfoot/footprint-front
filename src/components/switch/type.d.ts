export interface OnOffSwitchProps {
  onText: string
  offText: string
  booleanState: boolean
  setBooleanState: React.Dispatch<React.SetStateAction<boolean>>
}
