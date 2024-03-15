import React, { useState } from "react"
import { Box, Input, VStack, Text } from "@chakra-ui/react"

// 예시로 사용할 모의 한국 지역 및 여행지 데이터
const mockLocations = [
  "남이섬",
  "설악산",
  "한라산",
  "해운대 해수욕장",
  "경복궁",
  "남산타워",
  "불국사",
  "순천만 자연생태공원",
  "다도해 해상 국립공원",
  "제주도 오름",
  "강릉 경포대",
  "전주 한옥 마을",
  "순천 드라마 촬영장",
  "청계천",
  "동대문 디자인 플라자"
]

const SearchBox = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)

    // 모의 데이터에서 검색어를 기반으로 필터링하여 결과 설정
    const filteredResults = mockLocations.filter(location => location.toLowerCase().includes(value))
    setResults(filteredResults)
  }

  return (
    <VStack spacing={4}>
      <Input placeholder="장소 검색..." value={query} onChange={handleSearch} />
      <Box>
        {results.map((result, index) => (
          <Text key={index}>{result}</Text>
        ))}
      </Box>
    </VStack>
  )
}

export default SearchBox
