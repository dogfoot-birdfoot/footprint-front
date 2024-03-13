import React from "react"
import { Card, CardBody } from "@chakra-ui/card"
import { SlArrowRight } from "react-icons/sl"
import { DayDestination, DayHeader, DestinationItem } from "./DaySummary.style"

interface DaySummaryProps {
  selectedDay: string
  destinations: string[]
}

const DaySummary: React.FC<DaySummaryProps> = ({ selectedDay, destinations }) => {
  return (
    <Card width="500px" borderRadius="30px">
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
