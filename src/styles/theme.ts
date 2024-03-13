import { switchTheme } from "@/components/switch/SwitchTheme"
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: { Switch: switchTheme }
})

export default theme
