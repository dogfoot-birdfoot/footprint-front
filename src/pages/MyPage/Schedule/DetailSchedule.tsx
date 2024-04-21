// import DaySummary from "@/components/DaySummary/DaySummary"
// import { HorizontalCardContent, ScheduleButtons } from "@/components/HorizontalCard/HorizontalCard"
// import { DaySchedule, ScheduleDetail } from "./DetailSchedule.style"
// import { Box } from "@chakra-ui/react"

// const DetailSchedule = () => {
//   const destinations = [
//     ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
//     ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"],
//     ["태종대", "해동용궁사", "감천문화마을", "부평깡통시장"]
//   ]
//   return (
//     <ScheduleDetail>
//       <HorizontalCardContent size="sm" />
//       <DaySchedule>
//         {destinations.map((destination, index) => (
//           <Box key={index} marginRight="10px">
//             <DaySummary selectedDay={`Day ${index + 1}`} destinations={destination} size="sm" />
//           </Box>
//         ))}
//         <Box display="flex" justifyContent="flex-end">
//           <ScheduleButtons />
//         </Box>
//       </DaySchedule>
//     </ScheduleDetail>
//   )
// }

// export default DetailSchedule
import React, { useState } from "react"

interface DetailScheduleProps {
  id: number
  title: string
  startDate: string
  endDate: string
  region: string
  visible: boolean
  copyAllowed: boolean
  schedules: Schedule[]
  likeCount: number
  bookmarkCount: number
}

interface Schedule {
  day: number
  places: Place[]
}

interface Place {
  kakaoPlaceId: string
  placeName: string
  latitude: number
  longitude: number
  address: string
  placeDetails: PlaceDetails
}

interface PlaceDetails {
  memo: string
  cost: number
  visitTime: VisitTime
}

interface VisitTime {
  hour: number
  minute: number
  second: number
  nano: number
}

const DetailSchedule: React.FC<DetailScheduleProps> = ({
  id,
  title,
  startDate,
  endDate,
  region,
  visible,
  copyAllowed,
  schedules,
  likeCount,
  bookmarkCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div style={{ margin: "20px", padding: "10px", border: "1px solid gray", borderRadius: "8px" }}>
      <h2>
        {title} ({region})
      </h2>
      <p>
        시작일: {startDate} | 종료일: {endDate}
      </p>
      <p>
        공개 여부: {visible ? "Yes" : "No"} | 복사 허용: {copyAllowed ? "Yes" : "No"}
      </p>
      <p>
        좋아요: {likeCount} | 즐겨찾기: {bookmarkCount}
      </p>
      <button onClick={toggleExpand}>{isExpanded ? "세부 일정 숨기기" : "세부 일정 보기"}</button>
      {isExpanded && (
        <div>
          {schedules.map((schedule, index) => (
            <div key={index}>
              <h3>Day {schedule.day}</h3>
              {schedule.places.map((place, idx) => (
                <div key={idx} style={{ marginLeft: "20px" }}>
                  <h4>{place.placeName}</h4>
                  <p>위치: {place.address}</p>
                  <p>메모: {place.placeDetails.memo}</p>
                  <p>비용: {place.placeDetails.cost}원</p>
                  <p>
                    방문 시간: {`${place.placeDetails.visitTime.hour}시간 ${place.placeDetails.visitTime.minute}분`}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DetailSchedule
