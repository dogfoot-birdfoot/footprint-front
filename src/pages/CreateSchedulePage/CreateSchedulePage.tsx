import React from "react"
import CreateScheduleForm from "@/pages/CreateSchedulePage/CreateScheduleForm"
import { Box } from "@chakra-ui/react"
import Buttons from "@/components/Buttons/Buttons"

const CreateSchedulePage: React.FC = () => {
  return (
    <>
      <Box mb="50px">
        <Box display="flex" justifyContent="space-between">
          <CreateScheduleForm />
          <Box mt="30px">{/* <Buttons size="sm" text="임시저장" /> */}</Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateSchedulePage
