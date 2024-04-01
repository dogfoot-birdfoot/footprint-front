import React, { useState } from "react"

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody
} from "@chakra-ui/react"
import AddDestination from "@/pages/CreateSchedulePage/AddDestination"
import Calendar from "@/pages/CreateSchedulePage/Calendar"
import AddSchedule from "@/pages/CreateSchedulePage/AddSchedule"
import AddPost from "@/pages/CreateSchedulePage/AddPost"
import SearchBox from "@/pages/CreateSchedulePage/SearchBox"
import RouteMap from "@/pages/CreateSchedulePage/RouteMap"
import LoadSchedule from "@/pages/CreateSchedulePage/LoadSchedule"
import { placeObject } from "./type"

const CreateScheduleForm: React.FC = ({}) => {
  // 일정별 장소 저장을 위한 상태
  const [placesByDate, setPlacesByDate] = useState<Record<number, placeObject[]>>({}) // 일정별로 선택한 장소
  const [selectedPlaces, setSelectedPlaces] = useState<placeObject[]>([]) // 선택이 확정된 장소

  // 어떤 일정에 해당하는 searchBox, loadSchedule인지 표기
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [showLoadSchedule, setShowLoadSchedule] = useState(false)

  return (
    <>
      <>
        <Accordion allowMultiple defaultIndex={[0]} width="500px">
          <AccordionItem>
            <AccordionButton bg="primary" borderRadius="20px" height="60px" color="white">
              <Box as="span" flex="1" textAlign="left">
                Step 1. 지역선택
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Card mt="10px">
                <CardBody>
                  <AddDestination />
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem mt="20px">
            <AccordionButton bg="primary" borderRadius="20px" height="60px" color="white">
              <Box as="span" flex="1" textAlign="left">
                Step 2. 날짜선택
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Card mt="10px">
                <CardBody>
                  <Calendar />
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem mt="20px">
            <AccordionButton bg="primary" borderRadius="20px" height="60px" color="white">
              <Box as="span" flex="1" textAlign="left">
                Step 3. 세부일정
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Card mt="10px">
                <CardBody>
                  <AddSchedule
                    selectedPlaces={selectedPlaces}
                    placesByDate={placesByDate}
                    setPlacesByDate={setPlacesByDate}
                    showSearchBox={showSearchBox}
                    setShowSearchBox={setShowSearchBox}
                    showLoadSchedule={showLoadSchedule}
                    setShowLoadSchedule={setShowLoadSchedule}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    numberOfForms={1}
                  />
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem mt="20px" pt="10px" pb="10px">
            <AccordionButton bg="primary" borderRadius="20px" height="60px" color="white">
              <Box as="span" flex="1" textAlign="left">
                Step 4. 게시하기
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Card mt="10px">
                <CardBody>
                  <AddPost />
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* SearchBox 표기 부분 */}
        {activeIndex >= 0 && showSearchBox === true && showLoadSchedule === false && (
          <Box width="550px" height="450px" mt="100px" ml="50px" position="sticky" top="100px">
            <SearchBox setSelectedPlaces={setSelectedPlaces} />
          </Box>
        )}

        {activeIndex >= 0 && showSearchBox === false && showLoadSchedule === true && (
          <Box width="550px" height="450px" mt="100px" ml="50px" position="sticky" top="100px">
            <LoadSchedule activeIndex={activeIndex} setSelectedPlaces={setSelectedPlaces} />
          </Box>
        )}

        {/* Map 표기 부분(임시) */}
        {activeIndex < 0 && showSearchBox === false && showLoadSchedule === false && <RouteMap />}
      </>
    </>
  )
}

export default CreateScheduleForm
