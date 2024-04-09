import React, { useState } from "react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import DaySummary from "@/components/DaySummary/DaySummary"

export interface DayTabProps {
  destinations: string[][]
  onTabClick: (index: number) => void
}

const DayTab: React.FC<DayTabProps> = ({ destinations, onTabClick }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabClick = (index: number) => {
    setTabIndex(index)
    onTabClick(index) // 선택된 탭의 인덱스를 상위 컴포넌트로 전달
  }

  return (
    <>
      <Tabs variant="soft-rounded" mt="30px" ml="20px" onChange={handleTabClick} index={tabIndex}>
        <TabList ml="10px">
          {destinations.map((_, index) => (
            <Tab key={index} _selected={{ color: "white", bg: "primary" }}>{`Day ${index + 1}`}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {destinations.map((places, index) => (
            <TabPanel key={index}>
              <DaySummary selectedDay={`Day ${index + 1}`} destinations={places} size="lg" />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  )
}

export default DayTab
