import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { RegionBox } from "@/pages/CreateSchedulePage/AddDestination.style"

const AddDestination: React.FC = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])

  const koreanRegions = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주"
  ]

  const handleRegionClick = async (region: string) => {
    const newSelectedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region]

    setSelectedRegions(newSelectedRegions)

    // 서버에 선택 상태 업데이트를 비동기적으로 전송
    try {
      await fetch("/api/regions/selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ regionName: region, isSelected: newSelectedRegions.includes(region) })
      })
    } catch (error) {
      console.error("Error updating region selection:", error)
    }
  }

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap="10px">
        {koreanRegions.map(region => (
          <RegionBox
            key={region}
            onClick={() => handleRegionClick(region)}
            isSelected={selectedRegions.includes(region)} // isSelected prop을 통해 배경색 변경
          >
            {region}
          </RegionBox>
        ))}
      </Box>
    </>
  )
}

export default AddDestination
