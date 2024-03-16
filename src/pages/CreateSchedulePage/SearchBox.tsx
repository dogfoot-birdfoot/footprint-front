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
import { useSetRecoilState } from "recoil"
import { selectedPlacesState } from "./selectedPlaceState"

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

const SearchBox: React.FC = () => {
  // 리코일 사용해서 상태를 관리해줌 (너무 여기저기 컴포넌트를 거쳐야해서 리코일이 간편함)
  const setSelectedPlaces = useSetRecoilState(selectedPlacesState)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [selectedResults, setSelectedResults] = useState<string[]>([])

  const handleAddPlaces = () => {
    // 선택된 장소들을 리코일 상태에 업데이트
    setSelectedPlaces(selectedResults)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)

    // 모의 데이터에서 검색어를 기반으로 필터링하여 결과 설정
    const filteredResults = mockLocations.filter(location => location.toLowerCase().includes(value))
    setResults(filteredResults)
  }

  const handleCheckboxChange = (result: string) => {
    setSelectedResults(prevSelected =>
      prevSelected.includes(result) ? prevSelected.filter(item => item !== result) : [...prevSelected, result]
    )
  }

  const removeResult = (result: string) => {
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
            {results.map((result, index) => (
              <Box display="flex" key={index} mb="5px">
                <Checkbox
                  colorScheme="green"
                  isChecked={selectedResults.includes(result)}
                  onChange={() => handleCheckboxChange(result)}
                ></Checkbox>
                <Box ml="3">{result}</Box>
              </Box>
            ))}
          </SimpleGrid>
          <Wrap spacing={2} ml="40px" mt="20px">
            {selectedResults.map((result, index) => (
              <Tag size="md" key={index} borderRadius="full" variant="outline" colorScheme="blue">
                <TagLabel>{result}</TagLabel>
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
          추가
        </Button>
      </Box>
    </Card>
  )
}

export default SearchBox
