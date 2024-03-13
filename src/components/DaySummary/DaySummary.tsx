import React from "react"
import { Card, CardBody } from "@chakra-ui/card"
import { SlArrowRight } from "react-icons/sl"
import { DayDestination, DayHeader, DestinationItem } from "./DaySummary.style"

interface DaySummaryProps {
  selectedDay: string
}

const DaySummary: React.FC<DaySummaryProps> = ({ selectedDay }) => {
  // 나중에 destination을 동적으로 받아와야함
  const destinations = ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"]
  return (
    <Card width="500px">
      <CardBody display="flex" justifyContent="center">
        <DayHeader>{selectedDay}.</DayHeader>
        <DayDestination>
          {destinations.map((destination, index) => (
            <DestinationItem key={index}>
              {destination}
              {index < destinations.length - 1 && <SlArrowRight size="12px" />}
            </DestinationItem>
          ))}
        </DayDestination>
      </CardBody>
    </Card>
  )
}

export default DaySummary
