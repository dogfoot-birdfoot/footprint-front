import { jwtDecode } from "jwt-decode"
import { TokenType } from "./type"

const getMemberId = () => {
  const token = localStorage?.getItem("accessToken")
  const memberId = token ? jwtDecode<TokenType>(token).memberId : -1

  return memberId
}

export default getMemberId
