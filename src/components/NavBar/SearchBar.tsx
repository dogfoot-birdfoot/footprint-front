import React, { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom" // react-router-dom 사용
import { IconStyle, SearchContainer, StyledInput } from "./SearchBar.style"

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const navigate = useNavigate()

  const handleSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault() // 폼 제출 시 페이지 리로드 방지
    // 검색 결과 페이지로 이동, 예를 들어 '/search' 경로를 검색 결과 페이지로 사용
    if (searchTerm === "") {
      alert("검색어를 입력해주세요.")
    } else {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <SearchContainer>
        <StyledInput placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <IconStyle />
      </SearchContainer>
    </form>
  )
}

export default SearchBar
