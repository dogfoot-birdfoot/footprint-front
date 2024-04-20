import React, { useState } from "react"
import { OnOffSwitchProps } from "@/components/Switch/type"
import { Switch } from "@chakra-ui/react"

const OnOffSwitch: React.FC<OnOffSwitchProps> = ({ onText, offText, booleanState, setBooleanState }) => {
  const toggleIsPublic = () => {
    setBooleanState(!booleanState)
  }

  // toggle Switch
  return (
    <>
      <Switch
        colorScheme="green"
        isChecked={booleanState}
        onChange={toggleIsPublic}
        marginLeft="10px"
        sx={{
          ".chakra-switch__track::after": {
            content: booleanState ? `'${onText}'` : `'${offText}'`,
            color: booleanState ? "white" : "gray",
            display: "block",
            position: "absolute",
            transform: "translate(-50%,-50%)",
            top: "0.9rem",
            left: booleanState ? "48%" : "75%",
            width: "2rem",
            fontSize: "2xs"
          }
        }}
      />
    </>
  )
}

export default OnOffSwitch
