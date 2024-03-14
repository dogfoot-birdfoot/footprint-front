import DaySummary from "@/components/DaySummary/DaySummary"
import { HorizontalCardContent, ScheduleButtons } from "@/components/HorizontalCard/HorizontalCard"
import { DaySchedule, ScheduleDetail } from "./DetailSchedule.style"
import { Box } from "@chakra-ui/react"

const DetailSchedule = () => {
  const destinations = [
    ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
    ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
    ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"]
  ]
  return (
    <ScheduleDetail>
      <HorizontalCardContent size="sm" />
      <DaySchedule>
        {destinations.map((destination, index) => (
          <Box key={index}>
            <DaySummary selectedDay={`Day ${index + 1}`} destinations={destination} size="sm" />
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end">
          <ScheduleButtons />
        </Box>
      </DaySchedule>
    </ScheduleDetail>
  )
}

export default DetailSchedule
