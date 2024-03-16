import { switchAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    marginTop: "0.1rem",
    width: "3.8rem",
    height: "2rem"
  },
  thumb: {
    width: "1.5rem",
    height: "1.5rem",
    _checked: {
      marginLeft: "1.3rem"
    }
  },
  track: {
    width: "3.8rem",
    height: "1.5rem",
    bg: "gray.100",
    _checked: {
      bg: "lightblue"
    }
  },
  label: {
    bg: "red"
  }
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })
