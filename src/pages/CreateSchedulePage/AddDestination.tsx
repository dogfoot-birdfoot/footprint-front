import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { RegionBox } from "@/pages/CreateSchedulePage/AddDestination.style"

// Recoil
import { useRecoilState } from "recoil"
import { regionState } from "@/pages/CreateSchedulePage/atom"

const AddDestination: React.FC = () => {
  const [selectedRegions, setSelectedRegions] = useRecoilState(regionState)

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

  const handleRegionClick = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region))
    } else {
      setSelectedRegions([...selectedRegions, region])
    }
  }

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap="10px">
        {koreanRegions.map(region => (
          <RegionBox
            key={region}
            onClick={() => handleRegionClick(region)}
            selected={selectedRegions.includes(region)} // isSelected prop을 통해 배경색 변경
          >
            {region}
          </RegionBox>
        ))}
      </Box>
    </>
  )
}

export default AddDestination
