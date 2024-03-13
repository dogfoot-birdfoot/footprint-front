import React, { useState } from "react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import DaySummary from "@/components/DaySummary/DaySummary"
import { Card, CardBody } from "@chakra-ui/card"

const DayTab = () => {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <>
      <Tabs variant="soft-rounded" mt="30px" ml="20px" onChange={index => setTabIndex(index)}>
        <TabList ml="10px">
          <Tab _selected={{ color: "white", bg: "primary" }}>Day 1</Tab>
          <Tab _selected={{ color: "white", bg: "primary" }}>Day 2</Tab>
          <Tab _selected={{ color: "white", bg: "primary" }}>Day 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DaySummary selectedDay={`Day ${tabIndex + 1}`} />
          </TabPanel>
          <TabPanel>
            <DaySummary selectedDay={`Day ${tabIndex + 1}`} />
          </TabPanel>
          <TabPanel>
            <DaySummary selectedDay={`Day ${tabIndex + 1}`} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default DayTab
