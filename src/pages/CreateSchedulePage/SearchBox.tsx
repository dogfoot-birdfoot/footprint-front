import React, { useState } from "react"
import {
  VStack,
  Input,
  Box,
  Checkbox,
  Wrap,
  Tag,
  TagLabel,
  TagCloseButton,
  SimpleGrid,
  Card,
  InputGroup,
  InputLeftElement,
  Button
} from "@chakra-ui/react"
import { IconStyle } from "@/components/NavBar/SearchBar.style"
import { SearchBoxProps, resultObject } from "./type"

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
  "제주도 바다",
  "제주도 협재 해변",
  "강릉 경포대",
  "전주 한옥 마을",
  "순천 드라마 촬영장",
  "청계천",
  "동대문 디자인 플라자"
]

const SearchBox: React.FC<SearchBoxProps> = ({ setSelectedPlaces, selectedResults, setSelectedResults }) => {
  // results : 검색어 결과 목록, selectedResults : 선택된 장소(검색창 하단)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<resultObject[]>()
  const { kakao } = window

  const ps = new kakao.maps.services.Places() // 키워드 장소 검색 객체

  function searchPlaces(keyword: string) {
    // 검색 내용이 없다면 초기화
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      setResults([])
      return false
    }

    ps.keywordSearch(keyword, placesSearchCB)
  }
  function placesSearchCB(data: any, status: any, pagination: any) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면, 검색에 대한 결과인 results를 업데이트

      const resultData = []
      for (const index in data) {
        resultData.push({
          place_name: data[index]["place_name"],
          x: data[index]["x"].toString(),
          y: data[index]["y"].toString()
        })
      }
      setResults(resultData)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return
    } else if (status === kakao.maps.services.Status.ERROR) {
      return
    }
  }

  const handleAddPlaces = () => {
    // 선택된 장소들을 해당 날짜에 업데이트
    setSelectedPlaces(selectedResults)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)

    // 키워드 검색
    searchPlaces(value)
  }

  function includesResult(results: resultObject[], r2: resultObject) {
    // Object 비교를 위한 함수
    for (const r1 of results) {
      if (r1["place_name"] === r2["place_name"] && r1["x"] === r2["x"] && r1["y"] === r2["y"]) {
        return true
      }
    }
    return false
  }

  function isObjectEqual(r1: resultObject, r2: resultObject) {
    if (r1["place_name"] === r2["place_name"] && r1["x"] === r2["x"] && r1["y"] === r2["y"]) {
      return true
    }
    return false
  }

  const handleCheckboxChange = (result: resultObject) => {
    setSelectedResults(prevSelected =>
      includesResult(prevSelected, result)
        ? prevSelected.filter(item => isObjectEqual(item, result) === false)
        : [...prevSelected, result]
    )
  }

  const removeResult = (result: resultObject) => {
    setSelectedResults(prevSelected => prevSelected.filter(item => item !== result))
  }

  return (
    <Card>
      <VStack spacing={4} width="100%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IconStyle />
          </InputLeftElement>
          <Input placeholder="장소 검색..." value={query} onChange={handleSearch} variant="flushed" />
        </InputGroup>
        <Box width="100%" bg="white" borderRadius="md" maxH="400px" p={4} overflowY="auto">
          <SimpleGrid columns={2} spacing={2} mt="-4" ml="50px">
            {results &&
              results.map((result, index) => (
                <Box display="flex" key={index} mb="5px">
                  <Checkbox
                    colorScheme="green"
                    isChecked={includesResult(selectedResults, result)}
                    onChange={() => handleCheckboxChange(result)}
                  ></Checkbox>
                  <Box ml="3">{result["place_name"]}</Box>
                </Box>
              ))}
          </SimpleGrid>
          <Wrap spacing={2} ml="40px" mt="20px">
            {selectedResults.map((result, index) => (
              <Tag size="md" key={index} borderRadius="full" variant="outline" colorScheme="blue">
                <TagLabel>{result["place_name"]}</TagLabel>
                <TagCloseButton onClick={() => removeResult(result)} />
              </Tag>
            ))}
          </Wrap>
        </Box>
      </VStack>
      <Box display="flex" justifyContent="end" mb="10px" mr="10px">
        <Button
          _hover={{ bg: "secondary", color: "#fff" }}
          backgroundColor="primary"
          color="#fff"
          size="sm"
          height="40px"
          onClick={handleAddPlaces}
        >
          선택 완료
        </Button>
      </Box>
    </Card>
  )
}

export default SearchBox
