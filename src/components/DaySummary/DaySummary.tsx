import React from "react"
import { Card, CardBody } from "@chakra-ui/card"
import { SlArrowRight } from "react-icons/sl"
import { DayDestination, DayHeader, DestinationItem } from "./DaySummary.style"
import { Box } from "@chakra-ui/layout"
import Buttons from "@/components/Buttons/Buttons"
import Map from "../Map/Map"

interface DaySummaryProps {
  selectedDay: string
  destinations: string[]
}

const DaySummary: React.FC<DaySummaryProps> = ({ selectedDay, destinations }) => {
  return (
    <Box display="flex">
      <Card width="500px" borderRadius="30px" maxWidth="500px" maxHeight="70px">
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

      <Box ml="100px" display="flex" justifyContent="flex-end">
        <Map />
      </Box>
    </Box>
  )
}

export default DaySummary
