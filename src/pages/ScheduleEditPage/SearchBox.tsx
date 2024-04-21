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

// Recoil
import { useRecoilState, useSetRecoilState } from "recoil"
import { currentKeywords, placesByDateState } from "../../hooks/atom"
import { SearchBoxProps, placeObject } from "../CreateSchedulePage/type"

const SearchBox: React.FC<SearchBoxProps> = ({ activeIndex }) => {
  // query : 검색어, queryResults : 검색어에 해당 되는 결과, selectedKeywords : 선택된 키워드
  const [query, setQuery] = useState("")
  const [queryResults, setQueryResults] = useState<placeObject[]>()
  const [selectedKeywords, setSelectedKeywords] = useRecoilState(currentKeywords)
  const setPlacesByDate = useSetRecoilState(placesByDateState)

  // Kakao Map API
  const { kakao } = window
  const ps = new kakao.maps.services.Places() // 키워드 장소 검색 객체

  function searchPlaces(keyword: string) {
    // 검색 내용이 없다면 초기화
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      setQueryResults([])
      return false
    }

    ps.keywordSearch(keyword, placesSearchCB)
  }
  function placesSearchCB(data: any, status: any, pagination: any) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면, 검색에 대한 결과인 results를 업데이트

      const resultData = []
      console.log(data)
      for (const index in data) {
        resultData.push({
          kakaoPlaceId: data[index]["id"],
          placeName: data[index]["place_name"],
          longitude: data[index]["x"].toString(),
          latitude: data[index]["y"].toString(),
          address: data[index]["address_name"],
          placeDetails: {
            // placeDetails 객체 추가
            memo: undefined,
            cost: undefined,
            visitTime: undefined
          }
        })
      }
      setQueryResults(resultData)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return
    } else if (status === kakao.maps.services.Status.ERROR) {
      return
    }
  }

  const handleAddPlaces = () => {
    // 선택된 장소들을 해당 날짜에 업데이트
    if (activeIndex !== -1) {
      setPlacesByDate(prev => ({ ...prev, [activeIndex]: selectedKeywords }))
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)

    // 키워드 검색
    searchPlaces(value)
  }

  // Object 배열에 포함되는지 확인하는 함수
  function includesResult(results: placeObject[], r2: placeObject) {
    for (const r1 of results) {
      if (
        r1["placeName"] === r2["placeName"] &&
        r1["latitude"] === r2["latitude"] &&
        r1["longitude"] === r2["longitude"]
      ) {
        return true
      }
    }
    return false
  }

  // Object가 같은지 비교하는 함수
  function isObjectEqual(r1: placeObject, r2: placeObject) {
    if (
      r1["placeName"] === r2["placeName"] &&
      r1["latitude"] === r2["latitude"] &&
      r1["longitude"] === r2["longitude"]
    ) {
      return true
    }
    return false
  }

  const handleCheckboxChange = (result: placeObject) => {
    setSelectedKeywords(prevSelected =>
      includesResult(prevSelected, result)
        ? prevSelected.filter(item => isObjectEqual(item, result) === false)
        : [...prevSelected, result]
    )
  }

  const removeResult = (result: placeObject) => {
    setSelectedKeywords(prevSelected => prevSelected.filter(item => item !== result))
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
            {queryResults &&
              queryResults.map((result, index) => (
                <Box display="flex" key={index} mb="5px">
                  <Checkbox
                    colorScheme="green"
                    isChecked={includesResult(selectedKeywords, result)}
                    onChange={() => handleCheckboxChange(result)}
                  ></Checkbox>
                  <Box ml="3">{result["placeName"]}</Box>
                </Box>
              ))}
          </SimpleGrid>
          <Wrap spacing={2} ml="40px" mt="20px">
            {selectedKeywords.map((result, index) => (
              <Tag size="md" key={index} borderRadius="full" variant="outline" colorScheme="blue">
                <TagLabel>{result["placeName"]}</TagLabel>
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
