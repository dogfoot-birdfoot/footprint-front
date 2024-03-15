import React from "react"
import CreateScheduleForm from "@/pages/CreateSchedulePage/CreateScheduleForm"
import Map from "@/components/Map/Map"
import { Box, Card } from "@chakra-ui/react"
import Buttons from "@/components/Buttons/Buttons"

const CreateSchedulePage = () => {
  return (
    <>
      <Box mb="50px">
        <Box display="flex" justifyContent="space-between">
          <CreateScheduleForm />
          <Card width="500px" height="400px" mt="100px" ml="50px">
            다양한 창들이 노출됨
          </Card>
          <Box mt="30px">
            <Buttons size="sm" text="임시저장" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateSchedulePage
