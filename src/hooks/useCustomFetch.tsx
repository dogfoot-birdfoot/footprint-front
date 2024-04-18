import { useCustomFetchType } from "@/hooks/type"

type optionsType = {
  method?: string
  headers?: Record<string, string>
  body?: BodyInit | null
}

const useCustomFetch = async (url: string, options: optionsType) => {
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshToken")

  const refreshAccessToken = async (accessToken: string, refreshToken: string) => {
    try {
      console.log("refresh로 token 얻기")
      const refreshedResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ email: "3@3.3", password: "123123", accessToken, refreshToken })
      })
      if (!refreshedResponse.ok) {
        throw new Error("Failed to refresh access token")
      }
      const data = await refreshedResponse.json()
      console.log("refresh로 token 완료")
      return data["accessToken"]
    } catch (error) {
      console.log("Refreshing Access Token Error", error)
      throw error
    }
  }

  try {
    // token을 담아서 요청
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    })

    // 요청 시 토큰이 만료가 되었다면, 재발급 후 다시 fetch
    if (response.status === 401 && accessToken && refreshToken) {
      const newAccessToken = await refreshAccessToken(accessToken, refreshToken)
      console.log(newAccessToken)
      localStorage.setItem("accessToken", newAccessToken)

      const refreshedResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`
        }
      })

      return refreshedResponse
    }
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export default useCustomFetch
