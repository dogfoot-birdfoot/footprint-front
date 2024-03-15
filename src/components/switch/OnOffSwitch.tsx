import React, { useState } from "react"
import { OnOffSwitchProps } from "@/components/Switch/type"
import { Switch } from "@chakra-ui/react"

const OnOffSwitch: React.FC<OnOffSwitchProps> = ({ ontext, offtext }) => {
  const [isPublic, setIsPublic] = useState<boolean>(true)

  const toggleIsPublic = () => {
    setIsPublic(!isPublic)
  }

  return (
    <>
      <Switch
        colorScheme="green"
        isChecked={isPublic}
        onChange={toggleIsPublic}
        marginLeft="10px"
        sx={{
          ".chakra-switch__track::after": {
            content: isPublic ? `'${ontext}'` : `'${offtext}'`,
            color: isPublic ? "white" : "gray",
            display: "block",
            position: "absolute",
            transform: "translate(-50%,-50%)",
            top: "0.9rem",
            left: isPublic ? "48%" : "75%",
            width: "2rem",
            fontSize: "2xs"
          }
        }}
      />
    </>
  )
}

export default OnOffSwitch
