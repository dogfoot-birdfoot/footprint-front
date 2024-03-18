import React, { useState } from "react"
import CreateScheduleForm from "@/pages/CreateSchedulePage/CreateScheduleForm"
import { Box } from "@chakra-ui/react"
import Buttons from "@/components/Buttons/Buttons"
import SearchBox from "./SearchBox"

const CreateSchedulePage: React.FC = () => {
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Date[]>([]) // selectedDates 상태 끌어올리기

  return (
    <>
      <Box mb="50px">
        <Box display="flex" justifyContent="space-between">
          <CreateScheduleForm
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            showSearchBox={showSearchBox}
            setShowSearchBox={setShowSearchBox}
          />
          {showSearchBox && (
            <Box width="550px" height="450px" mt="100px" ml="50px" position="sticky" top="100px">
              <SearchBox />
            </Box>
          )}
          <Box mt="30px">
            <Buttons size="sm" text="임시저장" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateSchedulePage
