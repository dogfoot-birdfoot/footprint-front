import { jwtDecode } from "jwt-decode"
import { TokenType } from "./type"

const getEmail = () => {
  const token = localStorage?.getItem("accessToken")
  const memberId = token ? jwtDecode<TokenType>(token).sub : ""

  return memberId
}

export default getEmail
