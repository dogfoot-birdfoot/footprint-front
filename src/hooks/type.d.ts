export interface User {
  nickname: string
  profilePicture?: string // 프로필 사진이 선택적인 경우
}

export interface useCustomFetchType {
  url: string
  options: {
    method?: string
    headers?: Record<string, string>
    body?: BodyInit | null
  }
}
