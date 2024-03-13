import React, { useState } from "react"
import { PubPrivSwitchProps } from "@/components/switch/type"
import { Switch } from "@chakra-ui/react"

const PubPrivSwitch: React.FC<PubPrivSwitchProps> = ({ ontext, offtext }) => {
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
        sx={{
          ".chakra-switch__track::after": {
            content: isPublic ? `'${ontext}'` : `'${offtext}'`,
            color: isPublic ? "white" : "gray",
            display: "block",
            position: "absolute",
            transform: "translate(-50%,-50%)",
            top: "0.9rem",
            left: isPublic ? "48%" : "80%",
            width: "2rem",
            fontSize: "2xs"
          }
        }}
      />
    </>
  )
}

export default PubPrivSwitch
