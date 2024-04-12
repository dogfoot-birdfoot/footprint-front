import React from "react"
import { Spinner, Box } from "@chakra-ui/react"

const Loading: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" color="blue.500" />
    </Box>
  )
}

export default Loading
