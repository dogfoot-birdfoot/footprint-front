import { switchTheme } from "@/components/Switch/SwitchTheme"
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: { Switch: switchTheme },
  colors: {
    primary: "#10bbd5",
    secondary: "#1C90C1",
    textColor: "#3f3f3f"
  }
})

export default theme
