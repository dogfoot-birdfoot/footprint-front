import React from "react"
import HorizontalCard from "@/components/HorizontalCard/HorizontalCard"
import DayTab from "@/components/DayTab/DayTab"
import { Card, CardBody, CardHeader } from "@chakra-ui/card"
import { Box, Text } from "@chakra-ui/layout"
import { Editable, EditablePreview, EditableTextarea } from "@chakra-ui/editable"
import { IndexStyle, ScheduleDetailStyle } from "./ScheduleDetailPage.style"
import Map from "@/components/Map/Map"

const destinations = ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"]

const ScheduleDetailPage = () => {
  return (
    <Box ml="180px" mb="30px">
      <HorizontalCard />
      <DayTab destinations={destinations} />
      <Box ml="100px" display="flex" justifyContent="flex-end">
        <Map />
      </Box>
      <ScheduleDetailStyle>
        {destinations.map((destination, index) => (
          <Box width="500px" mt="10px" key={index}>
            <Card fontSize="15px" fontWeight="bold">
              <CardHeader display="flex" justifyContent="space-between">
                <Box display="flex">
                  <IndexStyle>{index + 1}</IndexStyle>
                  <Text>{destination}</Text>
                  <Text color="gray.500" fontSize="15px" ml="5px">
                    13:00
                  </Text>
                </Box>
                <Text color="gray.500" fontSize="12px" ml="5px">
                  예상경비 : 30,000원
                </Text>
              </CardHeader>
              <CardBody>
                <Editable defaultValue="바다 풍경보고 사진 많이 찍기, 시장 맛집투어" mt="-4">
                  <EditablePreview />
                  <EditableTextarea />
                </Editable>
              </CardBody>
            </Card>
          </Box>
        ))}
      </ScheduleDetailStyle>
    </Box>
  )
}

export default ScheduleDetailPage
