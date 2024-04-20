import React from "react"
import { Card, CardBody } from "@chakra-ui/card"
import { SlArrowRight } from "react-icons/sl"
import { DayDestination, DayHeader, DestinationItem, DestinationSmallItem } from "./DaySummary.style"
import { Box } from "@chakra-ui/layout"
import { BsThreeDots } from "react-icons/bs"
import { Icon } from "@chakra-ui/react"

export interface DaySummaryProps {
  selectedDay: string
  destinations: string[]
  size: string
}

const DaySummary: React.FC<DaySummaryProps> = ({ selectedDay, destinations, size }) => {
  return (
    <Box display="flex">
      <Card
        {...(size === "lg"
          ? { width: "550px", mt: "10px", borderRadius: "30px", maxWidth: "550px", maxHeight: "70px" }
          : { width: "430px", mt: "10px", borderRadius: "30px", maxWidth: "430px", maxHeight: "70px" })}
      >
        <CardBody display="flex" justifyContent="start" ml="20px">
          <DayHeader>{selectedDay}.</DayHeader>
          <DayDestination>
            {destinations.slice(0, 3).map((destination, index) =>
              size === "lg" ? (
                <DestinationItem key={index}>
                  {destination}
                  {index < destinations.length - 1 && <SlArrowRight size="12px" />}
                </DestinationItem>
              ) : (
                <DestinationSmallItem key={index}>
                  {destination}
                  {index < destinations.length - 1 && <SlArrowRight size="10px" />}
                </DestinationSmallItem>
              )
            )}

            {destinations.length > 3 && <Icon as={BsThreeDots} color="gray.500" />}
          </DayDestination>
        </CardBody>
      </Card>
    </Box>
  )
}

export default DaySummary
